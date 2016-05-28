<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * The main include file for HTTP_FloodControl package
 *
 * PHP version 5
 *
 * HTTP_FloodControl package for detecting and protecting from flood attempts
 * Copyright (c) 2007 Vagharshak Tozalakyan
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU  Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 * @version  0.1.1
 * @author   Vagharshak Tozalakyan <vagh@tozalakyan.com>
 * @license  http://www.gnu.org/licenses/lgpl.html  GNU Lesser General Public License
 * @link     http://pear.php.net/package/HTTP_FloodControl
 */

/**
 * PEAR::Exception
 */
require_once 'PEAR/Exception.php';

/**
 * Package-level exception class
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 */
class HTTP_FloodControl_Exception extends PEAR_Exception {}

/**
 * Class for detecting and protecting from attempts to flood a site
 *
 * This class can be used to detect and protect a Web site from attempts to
 * flood it with too many requests. It also allows to protect the site from
 * automatic downloading many pages or files from the same IP address. The
 * detection of flood is determine according to a set of parameters indicating
 * the maximal allowed number of requests for the certain time interval. It is
 * possible to set several parameters at once in order to perform more
 * effective protection.
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 * @author   Vagharshak Tozalakyan <vagh@tozalakyan.com>
 * @license  http://www.gnu.org/licenses/lgpl.html  GNU Lesser General Public License
 * @link     http://pear.php.net/package/HTTP_FloodControl
 */
class HTTP_FloodControl
{

    // {{{ properties

    /**
     * Container object used to store and retrieve data from request logs
     *
     * @access protected
     * @var    object
     */
    protected $_container = null;

    /**
     * Percent of probability that the garbage collection routine is started
     *
     * @access protected
     * @var    integer
     */
    protected $_gcProbability = 30;

    /**
     * Maximum lifetime of logs in seconds
     *
     * @access protected
     * @var    int
     */
    protected $_lifetime = 7200;

    /**
     * Incremental locking flag
     *
     * @access protected
     * @var    bool
     */
    protected $_incrementalLock = false;

    // }}}
    /// {{{ setContainer()

    /**
     * Init the storage container
     *
     * Sets the user-defined storage functions which are used for storing and
     * retrieving data associated with the class.
     *
     * @access public
     * @param  string  $container The name of the container to use.
     * @param  mixed   $options  Additional options associated with the container.
     * @return void
     * @throws HTTP_FloodControl_Exception when container class does not exist or unable to
     *         set the container.
     */
    public function setContainer($container, $options)
    {
        $contClass = 'HTTP_FloodControl_Container_' . $container;
        $contFile = 'HTTP/FloodControl/Container/' . $container . '.php';
        include_once $contFile;
        if (!class_exists($contClass)) {
            throw new HTTP_FloodControl_Exception("Container class $contClass does not exist.");
        }
        $this->_container = new $contClass($options);
        try {
            $this->_container->set();
        } catch (HTTP_FloodControl_Exception $e) {
            throw new HTTP_FloodControl_Exception('Unable to set the container.', $e);
        }
    }

    /// }}}
    /// {{{ setProbability()

    /**
     * Sets probability of garbage collection
     *
     * Sets the percent of probability that the garbage collection routine is
     * started.
     *
     * @access public
     * @param  int     $gcProbability  Probability in percents.
     * @return void
     * @throws HTTP_FloodControl_Exception in case of incorrect format of probability.
     */
    public function setProbability($gcProbability)
    {
        if (!is_int($gcProbability)) {
            throw new HTTP_FloodControl_Exception('Incorrect format of probability (an integer expected).');
        }
        $gcProbability = abs($gcProbability);
        if ($gcProbability > 100) {
            $gcProbability = 100;
        }
        $this->gcProbability = $gcProbability;
    }

    /// }}}
    /// {{{ getProbability()

    /**
     * Gets probability of garbage collection
     *
     * Gets the percent of probability that the garbage collection routine is
     * started.
     *
     * @access public
     * @return int     Probability in percents.
     */
    public function getProbability()
    {
        return $this->gcProbability;
    }

    /// }}}
    /// {{{ setLifetime()

    /**
     * Sets the lifetime of the logs
     *
     * Sets the maximum expire time of log entries.
     *
     * @access public
     * @param  int     $lifetime Lifetime in seconds.
     * @return void
     * @throws HTTP_FloodControl_Exception in case of incorrect format of lifetime.
     */
    public function setLifetime($lifetime)
    {
        if (!is_int($lifetime)) {
            throw new HTTP_FloodControl_Exception('Incorrect format of lifetime (an integer expected).');
        }
        $this->_lifetime = $lifetime;
    }

    /// }}}
    /// {{{ getLifetime()

    /**
     * Gets the lifetime of the logs
     *
     * Gets the maximum expire time of log entries.
     *
     * @access public
     * @return int     Lifetime in seconds.
     */
    public function getLifetime()
    {
        return $this->_lifetime;
    }

    /// }}}
    /// {{{ setIncrementalLock()

    /**
     * Sets the incremental lock mode
     *
     * Sets the flag indicating if the incremental lock mode is enabled.
     *
     * @access public
     * @param  bool    Incremental lock flag.
     * @return void
     */
    public function setIncrementalLock($incrementalLock)
    {
        $this->_incrementalLock = (bool) $incrementalLock;
    }

    /// }}}
    /// {{{ getIncrementalLock()

    /**
     * Gets the incremental lock flag
     *
     * Gets the flag indicating if the incremental lock mode is enabled.
     *
     * @access public
     * @return bool    Incremental lock flag.
     */
    public function getIncrementalLock()
    {
        return $this->_incrementalLock;
    }

    /// }}}
    /// {{{ check()

    /**
     * Detect a flooding attempt
     *
     * @access public
     * @param  array   $limits    Array of defined limits.
     * @param  string  $uniqueId  Unique identifier.
     * @return bool    False, in case of flooding attempt detected.
     * @throws HTTP_FloodControl_Exception if an error occured during checking process.
     */
    public function check($limits, $uniqueId = '')
    {
        if (is_null($this->_container)) {
            throw new HTTP_FloodControl_Exception('The container is undefined.');
        }
        if (!is_array($limits)) {
            throw new HTTP_FloodControl_Exception('Incorrect format of limits array.');
        }
        if (empty($uniqueId)) {
            $uniqueId = self::getUserIP();
        }
        list($usec, $sec) = explode(' ', microtime());
        mt_srand((float) $sec + ((float) $usec * 100000));
        if (mt_rand(0, 100) < $this->_gcProbability) {
            try {
                $this->_container->gc($this->_lifetime);
            } catch (HTTP_FloodControl_Exception $e) {
                throw new HTTP_FloodControl_Exception('Unable to execute the garbage collection.', $e);
            }
        }
        $data = array();
        try {
            $data = $this->_container->read($uniqueId);
        } catch (HTTP_FloodControl_Exception $e) {
            throw new HTTP_FloodControl_Exception('Unable to read the data.', $e);
        }
        $no_flood = true;
        foreach ($limits as $interval => $limit) {
            if (!isset($data[$interval])) {
                $data[$interval]['time'] = time();
                $data[$interval]['count'] = 0;
            }
            $data[$interval]['count'] += 1;
            if (time() - $data[$interval]['time'] > $interval) {
                $data[$interval]['count'] = 1;
                $data[$interval]['time'] = time();
            }
            if ($data[$interval]['count'] > $limit) {
                if ($this->_incrementalLock) {
                    $data[$interval]['time'] = time();
                }
                $no_flood = false;
            }
        }
        try {
            $this->_container->write($uniqueId, $data);
        } catch (HTTP_FloodControl_Exception $e) {
            throw new HTTP_FloodControl_Exception('Unable to write the data.', $e);
        }
        return $no_flood;
    }

    /// }}}
    /// {{{ getUserIP()

    /**
     * Tries to retrieve the  real IP address behind proxy
     *
     * @static
     * @access public
     * @return string  IP address.
     * @throws HTTP_FloodControl_Exception when IP address seems to be invalid.
     */
    public static function getUserIP()
    {
        $realIP = '';
        $httpXForwardedFor = '';
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $httpXForwardedFor = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        if (!empty($httpXForwardedFor)) {
            if (strpos($httpXForwardedFor, ',') !== false) {
                $ips = array_reverse(explode(', ', $httpXForwardedFor));
            } else {
                $ips[] = $httpXForwardedFor;
            }
            foreach ($ips as $i => $ip) {
                if (preg_match('~^((0|10|172\.16|192\.168|255|127\.0)\.|unknown)~', $ip) != 0) {
                    continue;
                }
                $realIP = trim($ip);
                break;
            }
            if (empty($realIP)) {
                throw new HTTP_FloodControl_Exception('Invalid IP address.');
            }
        } else {
            $realIP = $_SERVER['REMOTE_ADDR'];
        }
        $userIP = ip2long($realIP);
        if (!$userIP || $userIP == -1) {
            throw new HTTP_FloodControl_Exception('Invalid IP address.');
        }
        return strval($userIP);
    }

    /// }}}

}

?>
