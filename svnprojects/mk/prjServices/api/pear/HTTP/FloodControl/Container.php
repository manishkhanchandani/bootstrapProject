<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Abstract container class for storing data of HTTP_FloodControl package
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
 * Abstract container class for storing data of HTTP_FloodControl package
 *
 * @category HTTP
 * @package  HTTP_FloodControl
 * @author   Vagharshak Tozalakyan <vagh@tozalakyan.com>
 * @license  http://www.gnu.org/licenses/lgpl.html  GNU Lesser General Public License
 * @link     http://pear.php.net/package/HTTP_FloodControl
 */
abstract class HTTP_FloodControl_Container
{

    // {{{ properties

    /**
     * Additional options for the container object
     *
     * @access protected
     * @var    array
     */
    protected $_options = null;

    // }}}
    // {{{ __construct() [constructor]

    /**
     * Constructor
     *
     * @access public
     * @param  mixed  $options  Additional options for the container object.
     * @return void
     */
    public function __construct($options)
    {
        $this->_setDefaults();
        if (is_array($options)) {
            $this->_parseOptions($options);
        }
    }

    // }}}
    // {{{ _setDefaults()

    /**
     * Set some default options
     *
     * Has to be overwritten by each container class.
     *
     * @access protected
     * @return void
     */
    abstract protected function _setDefaults();

    // }}}
    // {{{ _parseOptions()

    /**
     * Parse options passed to the container class
     *
     * Has to be overwritten by each container class.
     *
     * @access protected
     * @param  array      Options array.
     * @return void
     */
    protected function _parseOptions($options)
    {
        foreach ($options as $option => $value) {
            if (isset($this->_options[$option])) {
                $this->_options[$option] = $value;
            }
        }
    }

    // }}}
    // {{{ set()

    /**
     * Init container
     *
     * Has to be overwritten by each container class.
     *
     * @access public
     * @return void
     */
    abstract public function set();

    // }}}
    // {{{ read()

    /**
     * Read data associated with a given unique ID
     *
     * Has to be overwritten by each container class.
     *
     * @access public
     * @param  string  $uniqurId  IP address or other unique ID.
     * @return mixed   An array of data associated with a given unique ID
     *                 or false in case of incorrect data format.
     */
    abstract public function read($uniqueId);

    // }}}
    // {{{ write()

    /**
     * Write data associated with a given unique ID to container
     *
     * Has to be overwritten by each container class
     *
     * @access public
     * @param  string  $uniqueId  IP address or other unique ID.
     * @param  array   $data      The data associated with a given unique ID.
     * @return void
     */
    abstract public function write($uniqueId, $data);

    // }}}
    // {{{ gc()

    /**
     * Garbage collector
     *
     * This function is responsible for garbage collection. It is responsible
     * for deleting old counter logs.
     *
     * Has to be overwritten by each container class
     *
     * @access public
     * @param  int     $lifetime  Maximum lifetime of counter logs.
     * @return void
     */
    abstract public function gc($lifetime);

    // }}}

}

?>
