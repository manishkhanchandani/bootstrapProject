<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * File container class for storing data of HTTP_FloodControl package
 *
 * PHP version 5
 *
 * HTTP_FloodControl package for detecting and protecting from flood attempts
 * Copyright (C) 2007 Vagharshak Tozalakyan
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
 * Basic container
 */
require_once 'HTTP/FloodControl/Container.php';

/**
 * File container class for storing data of HTTP_FloodControl package
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 * @author   Vagharshak Tozalakyan <vagh@tozalakyan.com>
 * @license  http://www.gnu.org/licenses/lgpl.html  GNU Lesser General Public License
 * @link     http://pear.php.net/package/HTTP_FloodControl
 */
class HTTP_FloodControl_Container_File extends HTTP_FloodControl_Container
{

    // {{{ __construct() [constructor]

    /**
     * Constructor
     *
     * @access public
     * @param  mixed  $options  An array of additional options for the container
     *                          object or a path to directory of counter logs.
     * @return void
     */
    public function __construct($options)
    {
        $this->_setDefaults();
        if (is_array($options)) {
            $this->_parseOptions($options);
        } else {
            $this->_options['logs_dir'] = $options;
        }
    }

    // }}}
    // {{{ _setDefaults()

    /**
     * Set some default options
     *
     * @access private
     * @return void
     */
    protected function _setDefaults()
    {
        $this->_options['logs_dir'] = 'fc_logs';
    }

    // }}}
    // {{{ set()

    /**
     * Init File container
     *
     * @access public
     * @return void
     * @throws HTTP_FloodControl_Exception in case of incorrect directory path of counter logs.
     */
    public function set()
    {
        $logs_dir = $this->_options['logs_dir'];
        if (is_null($logs_dir) || !is_dir($logs_dir)) {
            throw new HTTP_FloodControl_Exception("$logs_dir is incorrect temporary directory.");
        }
        $logs_dir = str_replace('\\', '/', $logs_dir);
        if (substr($logs_dir, -1) != '/') {
            $logs_dir .= '/';
        }
        $this->_options['logs_dir'] = $logs_dir;
    }

    // }}}
    // {{{ read()

    /**
     * Read data associated with a given unique ID
     *
     * @access public
     * @param  string  $uniqurId  IP address or other unique ID.
     * @return mixed   An array of data associated with a given unique ID
     *                 or false in case of incorrect data format.
     * @throws HTTP_FloodControl_Exception if an error occured while reading from log file.
     */
    public function read($uniqueId)
    {
        $log_file = $this->_options['logs_dir'] . $uniqueId;
        if (!file_exists($log_file)) {
            return;
        }
        if (!($f = fopen($log_file, 'r'))) {
            throw new HTTP_FloodControl_Exception("Unable to read from the log file $log_file.");
        }
        flock($f, LOCK_SH);
        $data = fread($f, filesize($log_file));
        $data = @unserialize($data);
        flock($f, LOCK_UN);
        fclose($f);
        return $data;
    }

    // }}}
    // {{{ write()

    /**
     * Write data associated with a given unique ID to container
     *
     * @access public
     * @param  string  $uniqueId  IP address or other unique ID.
     * @param  array   $data      The data associated with a given unique ID.
     * @return void
     * @throws HTTP_FloodControl_Exception if an error occured during writing process.
     */
    public function write($uniqueId, $data)
    {
        $log_file = $this->_options['logs_dir'] . $uniqueId;
        if (!($f = fopen($log_file, 'w'))) {
            throw new HTTP_FloodControl_Exception("Unable to write to the log file $log_file.");
        }
        flock($f, LOCK_EX);
        fwrite($f, serialize($data));
        flock($f, LOCK_UN);
        fclose($f);
    }

    // }}}
    // {{{ gc()

    /**
     * Garbage collector
     *
     * This function is responsible for garbage collection. It is responsible
     * for deleting old counter logs.
     *
     * @access public
     * @param  int     $lifetime  Maximum lifetime of counter logs.
     * @return void
     * @throws HTTP_FloodControl_Exception if an error occured during garbage collection.
     */
    public function gc($lifetime)
    {
        $logs_dir = $this->_options['logs_dir'];
        if (!($dir_hndl = opendir($logs_dir))) {
            throw new HTTP_FloodControl_Exception("Unable to open $logs_dir");
        }
        while ($fname = readdir($dir_hndl)) {
            if (substr($fname, 0, 1) == '.') {
                continue;
            }
            clearstatcache();
            $ftm = filemtime($logs_dir . $fname);
            if (time() - $ftm > $lifetime) {
               @unlink($logs_dir . $fname);
            }
        }
        closedir($dir_hndl);
    }

    // }}}

}

?>
