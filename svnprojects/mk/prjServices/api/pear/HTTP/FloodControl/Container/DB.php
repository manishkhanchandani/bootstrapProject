<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * PEAR DB container class for storing data of HTTP_FloodControl package
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
 * PEAR::DB
 */
require_once 'DB.php';

/**
 * PEAR::DB container class for storing data of HTTP_FloodControl package
 *
 * Create the following table to store counter logs:
 * <code>
 * CREATE TABLE `fc_logs` (
 *      `unique_id` varchar(32) NOT NULL,
 *      `data` text NOT NULL,
 *      `access` int UNSIGNED NOT NULL,
 *      PRIMARY KEY (`unique_id`)
 * );
 * </code>
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 * @author   Vagharshak Tozalakyan <vagh@tozalakyan.com>
 * @license  http://www.gnu.org/licenses/lgpl.html  GNU Lesser General Public License
 * @link     http://pear.php.net/package/HTTP_FloodControl
 */
class HTTP_FloodControl_Container_DB extends HTTP_FloodControl_Container
{

    // {{{ properties

    /**
     * Database handle
     *
     * @access protected
     * @var    object
     */
    protected $_db = null;

    // }}}
    // {{{ __construct() [constructor]

    /**
     * Constructor
     *
     * @access public
     * @param  mixed  $options  An array of additional options for the container
     *                          object or a DSN string.
     * @return void
     */
    public function __construct($options)
    {
        $this->_setDefaults();
        if (is_array($options)) {
            $this->_parseOptions($options);
        } else {
            $this->_options['dsn'] = $options;
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
        $this->_options['dsn'] = '';
        $this->_options['table'] = 'fc_logs';
        $this->_options['autooptimize'] = false;
    }

    // }}
    // {{{ set()

    /**
     * Init DB container
     *
     * @access public
     * @return void
     * @throws HTTP_FloodControl_Exception if it is impossible to establish database connection.
     */
    public function set()
    {
        $dsn = $this->_options['dsn'];
        if (is_string($dsn) || is_array($dsn)) {
            $this->_db = DB::connect($dsn);
        } else if (is_object($dsn) && is_a($dsn, 'db_common')) {
            $this->_db = $dsn;
        } else {
            throw new HTTP_FloodControl_Exception('Incorrect DSN format.');
        }
        if (PEAR::isError($this->_db)) {
            throw new HTTP_FloodControl_Exception($this->_db->getMessage(), $this->_db->getCode());
        }
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
     * @throws HTTP_FloodControl_Exception if an error occured while reading from database.
     */
    public function read($uniqueId)
    {
        $query = sprintf("SELECT data FROM %s WHERE unique_id = %s",
                         $this->_db->quoteIdentifier($this->_options['table']),
                         $this->_db->quoteSmart($uniqueId));
        $result = $this->_db->getOne($query);
        if (PEAR::isError($result)) {
            throw new HTTP_FloodControl_Exception($result->getMessage(), $result->getCode());
        }
        return @unserialize($result);
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
        $quotedTblName = $this->_db->quoteIdentifier($this->_options['table']);
        $this->_db->autoCommit(false);
        $query = sprintf("DELETE FROM %s WHERE unique_id = %s",
                         $quotedTblName,
                         $this->_db->quoteSmart($uniqueId));
        $result = $this->_db->query($query);
        if (PEAR::isError($result)) {
            throw new HTTP_FloodControl_Exception($result->getMessage(), $result->getCode());
        }
        $query = sprintf("INSERT INTO %s (unique_id, data, access) VALUES (%s, %s, %d)",
                         $quotedTblName,
                         $this->_db->quoteSmart($uniqueId),
                         $this->_db->quoteSmart(serialize($data)),
                         time());
        $result = $this->_db->query($query);
        if (PEAR::isError($result)) {
            $this->_db->rollback();
            throw new HTTP_FloodControl_Exception($result->getMessage(), $result->getCode());
        }
        $this->_db->commit();
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
        $quotedTblName = $this->_db->quoteIdentifier($this->_options['table']);
        $query = sprintf("DELETE FROM %s WHERE access < %d",
                         $quotedTblName,
                         time() - $lifetime);
        $result = $this->_db->query($query);
        if (PEAR::isError($result)) {
            throw new HTTP_FloodControl_Exception($result->getMessage(), $result->getCode());
        }
        if ($this->_options['autooptimize']) {
            switch($this->_db->phptype) {
                case 'mysql':
                    $query = sprintf("OPTIMIZE TABLE %s", $quotedTblName);
                    break;
                case 'pgsql':
                    $query = sprintf("VACUUM %s", $quotedTblName);
                    break;
                default:
                    $query = null;
                    break;
            }
            if (!is_null($query)) {
                $result = $this->_db->query($query);
                if (PEAR::isError($result)) {
                    throw new HTTP_FloodControl_Exception($result->getMessage(), $result->getCode());
                }
            }
        }
    }

    // }}}

}

?>
