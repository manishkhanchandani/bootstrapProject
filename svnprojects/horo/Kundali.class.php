<?php

//date_default_timezone_set('America/Los_Angeles');
class Library_Kundali
{
	protected $d2r;

	protected $r2d;

	protected $ra;// right ascension, declination

	protected $dc;

	protected $pln;// parallax longitude and latitude

	protected $plt;

	protected $lord = 'KeVeSuMoMaRaJuSaMe';

	protected $dasha = array(7,20,6,10,7,18,16,19,17);

	protected $zn = 'AriTauGemCanLeoVirLibScoSagCapAquPis'; // Zodiac

	protected $range = array(1,12,1,31,1800,2100,0,23,0,59,0,12,0,59,0,0,0,179,0,59,0,0,0,89,0,59);

	protected $naks = array("Aswini",	"Bharani",	"Krittika","Rohini",	"Mrigsira","Ardra","Punarvasu",
	"Pushya",	"Aslesha",	"Magha","P.Phalguni","U.Phalguni",	"Hasta","Chitra",	"Swati","Vishakha",
	"Anuradha","Jyeshtha","Mula","P.Shadya",	"U.Shadya","Shravana",	"Dhanishtha",
	"Shatbisha",	"P.Phadra","U.Phadra","Revati");
	
	public function __construct()
	{
		$this->d2r = M_PI / 180;

		$this->r2d = 180 / M_PI;
	}

	public function getnaksfromnumber($number)
	{
		$retnaks = '';
		switch($number) {
			case '01':
				$retnaks = 'Aswini';
				break;
			case '02':
				$retnaks = 'Bharani';
				break;
			case '03':
				$retnaks = 'Krittika';
				break;
			case '03b':
				$retnaks = 'Krittika';
				break;
			case '04':
				$retnaks = 'Rohini';
				break;
			case '05':
				$retnaks = 'Mrigsira';
				break;
			case '05b':
				$retnaks = 'Mrigsira';
				break;
			case '06':
				$retnaks = 'Ardra';
				break;
			case '07':
				$retnaks = 'Punarvasu';
				break;
			case '07b':
				$retnaks = 'Punarvasu';
				break;
			case '08':
				$retnaks = 'Pushya';
				break;
			case '09':
				$retnaks = 'Aslesha';
				break;
			case '10':
				$retnaks = 'Magha';
				break;
			case '11':
				$retnaks = 'P.Phalguni';
				break;
			case '12':
				$retnaks = 'U.Phalguni';
				break;
			case '12b':
				$retnaks = 'U.Phalguni';
				break;
			case '13':
				$retnaks = 'Hasta';
				break;
			case '14':
				$retnaks = 'Chitra';
				break;
			case '14b':
				$retnaks = 'Chitra';
				break;
			case '15':
				$retnaks = 'Swati';
				break;
			case '16':
				$retnaks = 'Vishakha';
				break;
			case '16b':
				$retnaks = 'Vishakha';
				break;
			case '17':
				$retnaks = 'Anuradha';
				break;
			case '18':
				$retnaks = 'Jyeshtha';
				break;
			case '19':
				$retnaks = 'Mula';
				break;
			case '20':
				$retnaks = 'P.Shadya';
				break;
			case '21':
				$retnaks = 'U.Shadya';
				break;
			case '21b':
				$retnaks = 'U.Shadya';
				break;
			case '22':
				$retnaks = 'Shravana';
				break;
			case '23':
				$retnaks = 'Dhanishtha';
				break;
			case '23b':
				$retnaks = 'Dhanishtha';
				break;
			case '24':
				$retnaks = 'Shatbisha';
				break;
			case '25':
				$retnaks = 'P.Phadra';
				break;
			case '25b':
				$retnaks = 'P.Phadra';
				break;
			case '26':
				$retnaks = 'U.Phadra';
				break;
			case '27':
				$retnaks = 'Revati';
				break;
		}
		return $retnaks;
	}

	protected function checkpart($zodiac, $nakshtra)
	{
		switch($zodiac) {
			case 'Ari':
				if ($nakshtra == 'Aswini') {
					return '01';
				} else if ($nakshtra == 'Bharani') {
					return '02';
				} if ($nakshtra == 'Krittika') {
					return '03';
				}
				break;
			case 'Tau':
				if ($nakshtra == 'Krittika') {
					return '03b';
				} else if ($nakshtra == 'Rohini') {
					return '04';
				} if ($nakshtra == 'Mrigsira') {
					return '05';
				}
				break;
			case 'Gem':
				if ($nakshtra == 'Mrigsira') {
					return '05b';
				} else if ($nakshtra == 'Ardra') {
					return '06';
				} if ($nakshtra == 'Punarvasu') {
					return '07';
				}
				break;
			case 'Can':
				if ($nakshtra == 'Punarvasu') {
					return '07b';
				} else if ($nakshtra == 'Pushya') {
					return '08';
				} if ($nakshtra == 'Aslesha') {
					return '09';
				}
				break;
			case 'Leo':
				if ($nakshtra == 'Magha') {
					return '10';
				} else if ($nakshtra == 'P.Phalguni') {
					return '11';
				} if ($nakshtra == 'U.Phalguni') {
					return '12';
				}
				break;
			case 'Vir':
				if ($nakshtra == 'U.Phalguni') {
					return '12b';
				} else if ($nakshtra == 'Hasta') {
					return '13';
				} if ($nakshtra == 'Chitra') {
					return '14';
				}
				break;
			case 'Lib':
				if ($nakshtra == 'Chitra') {
					return '14b';
				} else if ($nakshtra == 'Swati') {
					return '15';
				} if ($nakshtra == 'Vishakha') {
					return '16';
				}
				break;
			case 'Sco':
				if ($nakshtra == 'Vishakha') {
					return '16b';
				} else if ($nakshtra == 'Anuradha') {
					return '17';
				} if ($nakshtra == 'Jyeshtha') {
					return '18';
				}
				break;
			case 'Sag':
				if ($nakshtra == 'Mula') {
					return '19';
				} else if ($nakshtra == 'P.Shadya') {
					return '20';
				} if ($nakshtra == 'U.Shadya') {
					return '21';
				}
				break;
			case 'Cap':
				if ($nakshtra == 'U.Shadya') {
					return '21b';
				} else if ($nakshtra == 'Shravana') {
					return '22';
				} if ($nakshtra == 'Dhanishtha') {
					return '23';
				}
				break;
			case 'Aqu':
				if ($nakshtra == 'Dhanishtha') {
					return '23b';
				} else if ($nakshtra == 'Shatbisha') {
					return '24';
				} if ($nakshtra == 'P.Phadra') {
					return '25';
				}
				break;
			case 'Pis':
				if ($nakshtra == 'P.Phadra') {
					return '25b';
				} else if ($nakshtra == 'U.Phadra') {
					return '26';
				} if ($nakshtra == 'Revati') {
					return '27';
				}
				break;
		}
	}

	public function precalculate($mon=6, $day=5, $year=1974, $hr=12, $min=30, $zhour=5, $zmin=30, $lnd=73, $lnm=10, $lad=19, $lam=10, $dst='', $eln=1, $sla='')
	{
		$hr = floor($hr);
		$hr += floor($min)/60;
		$tz= floor($zhour);
		$tz += floor($zmin)/60;
		$ln= floor($lnd);
		$ln += floor($lnm)/60;
		$la= floor($lad);
		$la += floor($lam)/60;
		//echo ($mon . '-' . $day . '-' . $year . '-' . $hr . '-' . $tz . '-' . $ln . '-' . $la . '-' . $dst . '-' . $eln . '-' . $sla);
		return $this->calculate($mon, $day, $year, $hr, $tz, $ln, $la, $dst, $eln, $sla);
	}

	public function calculate($mon, $day, $year, $hr, $tz, $ln, $la, $dst, $eln, $sla)
	{
		$returnArr = array();
		//tmezone changes
		if($eln == 1)
			$ln = -$ln;
		if($sla == 1)
			$la = -$la;
		if($dst == 1){
			if($ln < 0.0)
				$tz++;
			else
				$tz--;
		}
		//echo ($mon . '-' . $day . '-' . $year . '-' . $hr . '-' . $tz . '-' . $ln . '-' . $la . '-' . $dst . '-' . $eln . '-' . $sla);
		$jd = $this->mdy2julian($mon, $day, $year);
		//echo $jd;
		if($ln < 0.0)
			$f = $hr - $tz;
		else
			$f = $hr + $tz;
		//echo $f;
		$t = ($jd - 2451545 - 0.5)/36525;
		//echo $t; echo '<br>';
		$gst = $this->ut2gst($t, $f);
		//echo $gst; echo '<br>';
		$t = (($jd - 2451545) + $f/24 - 0.5)/36525;
		//echo $t; echo '<br>';
		$ay = $this->calcayan($t);
		//echo $ay; echo '<br>';
	
		$ob = 23.452294 - 0.0130125 * $t;//  Obliquity of Ecliptic
		//echo $ob; echo '<br>';

		// Calculate Moon longitude, latitude, and distance using truncated Chapront algorithm
	
		// Moon mean longitude
		$l = (218.3164591 + 481267.88134236 * $t);
		// Moon mean elongation
		$d = (297.8502042 + 445267.1115168 * $t); 
		// Sun's mean anomaly
		$m = (357.5291092 + 35999.0502909 * $t);
		// Moon's mean anomaly
		$mm = (134.9634114 + 477198.8676313 * $t);
		// Moon's argument of latitude
		$f = (93.2720993 + 483202.0175273 * $t);
		//echo $l.' - '.$d.' - '.$m.' - '.$mm.' - '.$f;
		//echo '<br>';
	
		$d *= $this->d2r;
		$m *= $this->d2r;
		$mm *= $this->d2r;
		$f *= $this->d2r;
	
		$e = 1 - 0.002516 * $t - 0.0000074 * $t * $t;
		//echo $e;
		//echo '<br>';
		//echo $l.' - '.$d.' - '.$m.' - '.$mm.' - '.$f;

		$p = 6.288774 * sin($mm) 
			+ 1.274027 * sin($d*2-$mm)
			+ 0.658314 * sin($d*2) 	
			+ 0.213618 * sin(2*$mm)  
			- 0.185116 * $e * sin($m) 
			- 0.114332 * sin($f*2);

		$p +=	0.058793 * sin($d*2 - $mm * 2)
				+ 0.057066 * $e * sin($d*2 - $m - $mm)
				+ 0.053322 * sin($d*2 + $mm)
				+ 0.045758 * $e * sin($d*2 - $m) 
				- 0.040923 * $e * sin($m - $mm) 
				- 0.034720 * sin($d)
				- 0.030383 * $e * sin($m + $mm);
	
		$p +=	0.015327 * sin($d*2 - $f*2)
				- 0.012528 * sin($mm + $f*2)
				+ 0.010980 * sin($mm - $f*2)
				+ 0.010675 * sin($d * 4 - $mm)
				+ 0.010034 * sin(3 * $mm);
	
		$p +=	  0.008548 * sin($d * 4 - $mm * 2)
				- 0.007888 * $e * sin($d * 2 + $m - $mm)
				- 0.006766 * $e * sin($d * 2 + $m)
				- 0.005163 * sin($d - $mm)
				+ 0.004987 * $e * sin($d + $m)
				+ 0.004036 * $e * sin($d*2 - $m + $mm)
				+ 0.003994 * sin($d * 2 + $mm * 2);
	
		$b = 	  5.128122 * sin($f)
				+ 0.280602 * sin($mm+$f)
				+ 0.277693 * sin($mm-$f)
				+ 0.173237 * sin($d*2-$f)
				+ 0.055413 * sin($d*2-$mm+$f)
				+ 0.046271 * sin($d*2-$mm-$f);
	
		$b += 	  0.032573 * sin(2*$d + $f)
				+ 0.017198 * sin(2*$mm + $f)
				+ 0.009266 * sin(2*$d + $mm - $f)
				+ 0.008823 * sin(2*$mm - $f)
				+ 0.008247 * $e * sin(2*$d - $m - $f)
				+ 0.004324 * sin(2*$d - $f - 2*$mm);
	
		$b += 	  0.004200 * sin(2*$d +$f+$mm)
				+ 0.003372 * $e * sin($f - $m - 2 * $d)
				+ 0.002472 * $e * sin(2*$d+$f-$m-$mm)
				+ 0.002222 * $e * sin(2*$d + $f - $m)
				+ 0.002072 * $e * sin(2*$d-$f-$m-$mm)
				+ 0.001877 * $e * sin($f-$m+$mm);
	
		$b += 	  0.001828 * sin(4*$d-$f-$mm)
				- 0.001803 * $e * sin($f+$m)
				- 0.001750 * sin(3*$f)
				+ 0.001570 * $e * sin($mm-$m-$f)
				- 0.001487 * sin($f+$d)
				- 0.001481 * $e * sin($f+$m+$mm);
	
		
		$r =	0.950724 + 0.051818  * cos($mm)
				+ 0.009531 * cos(2*$d - $mm)
				+ 0.007843 * cos(2*$d)
				+ 0.002824 * cos(2*$mm)
				+ 0.000857 * cos(2*$d + $mm)
				+ 0.000533 * $e * cos(2*$d - $m);
	
		$r += 	0.000401 * $e * cos(2*$d-$m-$mm)
				+ 0.000320 * $e * cos($mm-$m)
				- 0.000271 * cos($d)
				- 0.000264 * $e * cos($m+$mm)
				- 0.000198 * cos(2*$f - $mm)
				+ 0.000173 * cos(3 * $mm);
	
		$r += 	0.000167 * cos(4*$d - $mm)
				- 0.000111 * $e * cos($m)
				+ 0.000103 * cos(4*$d - 2*$mm)
				- 0.000084 * cos(2*$mm - 2*$d)
				- 0.000083 * $e * cos(2*$d + $m)
				+ 0.000079 * cos(2*$d + 2*$mm)
				+ 0.000072 * cos(4*$d);
		//echo $p.'/'.$b.'/'.$r;
		$l += $p;
		while($l < 0.0) $l += 360.0;
		while($l > 360.0) $l -= 360.0;
		//echo $l;
		//  Parallax calculations are found in Meeus, Duffett-Smith, Astrologic Almanac (etc)
		//  Topocentric calculations are done on RA and DEC

		// start parallax calculations
		$this->ecl2equ($l, $b, $ob);
		$ln = -$ln; // flip sign of longitude
		$ln /= 15;
		$ln += $gst;
		while($ln < 0.0) $ln += 24;
		while($ln > 24.0) $ln -= 24;
		$h = ($ln - $this->ra) * 15;
		//echo $ln.'/'.$h.'/'.$this->ra;
		// calc observer latitude vars
		$u = atan(0.996647 * tan($this->d2r * $la));
		// hh = alt/6378140; // assume sea level
		$s = 0.996647 * sin($u); // assume sealevel
		$c = cos($u);	// + hh * cos(d2r(la)); // cos la' -- assume sea level
		$r = 1/sin($this->d2r * $r);
		$dlt = atan2($c * sin($this->d2r * $h), $r * cos($this->d2r * $this->dc) - $c * cos($this->d2r* $h));
		$dlt *= $this->r2d; 
		$hh = $h + $dlt;
		$dlt /= 15;
		$this->ra -= $dlt;
		$this->dc = atan(cos($this->d2r * $hh) * (($r * sin($this->d2r * $this->dc) - $s)/
			($r * cos($this->d2r * $this->dc) * cos($this->d2r * $h) - $c)) );
		$this->dc *= $this->r2d;
		//echo $u.'/'.$s.'/'.$c.'/'.$r.'/'.$dlt.'/'.$hh.'/'.$this->ra.'/'.$this->dc;
		$this->equ2ecl($this->ra, $this->dc, $ob);
		//echo $this->pln.'/'.$this->pla;
		// dasha calculations
		//echo $l.'/'.$ay;
		//echo '<br>';
		$l += $ay;
		if($l < 0.0) $l += 360.0;
		//echo $l.'/'.$ay;
		$returnArr[0] = $this->lon2dmsz($l);
		$nk = ($l * 60)/800.0;// get nakshatra
		$returnArr[1] = $this->naks[floor($nk)];
		$returnArr[2] = $this->getzodiac($l);
		$returnArr[3] = $this->checkpart($returnArr[2], $returnArr[1]);
		$nl = floor($nk) % 9;
		$db = 1 - ($nk - floor($nk));
		$bk = $this->calcbhukti($db, $nl);
		$ndasha = ($db * $this->dasha[$nl]) * 365.25;
		$jd1 = $jd + $ndasha;
		$d1 = $nl;
		//echo $bk.'/'.$ndasha.'/'.$jd1.'/'.$d1;
		$pd = $this->calcpraty($db, $nl);
		//echo $pd;
		$returnArr[4] = substr($this->lord, ($nl*2), 2) . "/" . substr($this->lord, ($bk*2), 2) . "/" . substr($this->lord, ($pd*2), 2);
		$nl++;
		if($nl == 9) $nl = 0;
		//echo $nl;
		$str = substr($this->lord, ($nl*2), 2) . "/" . substr($this->lord, ($nl*2), 2) . " ";
		$str .= $this->jul2mdy($jd1);
		$returnArr[5] = $str;

		// Parallax Dasha
		$this->pln += $ay;
		if($this->pln < 0.0) $this->pln += 360.0;
		$returnArr[6] = $this->lon2dmsz($this->pln);
		$nk = ($this->pln * 60)/800.0;	// get nakshatra
		$returnArr[7] = $this->naks[floor($nk)];
		$returnArr[8] = $this->getzodiac($this->pln);
		$returnArr[9] = $this->checkpart($returnArr[8], $returnArr[7]);
		$nl = floor($nk) % 9;
		$db = 1 - ($nk - floor($nk));

		$bk = $this->calcbhukti($db, $nl);
		$ndasha = ($db * $this->dasha[$nl]) * 365.25;
		$jd2 = $jd + $ndasha;
		$this->jul2mdy($jd2); //check this why it is present here without any work
		$diff = round(abs($jd2-$jd1)); // find difference in days
		if($d1 != $nl){
			if($d1 < $nl)
				$diff = $this->dasha[$nl] * 365.25 - $diff;
			else
				$diff = $this->dasha[$d1] * 365.25 - $diff;
			$diff = round(abs($diff));
		}
		$pd = $this->calcpraty($db, $nl);
		$returnArr[10] = substr($this->lord, ($nl*2), 2) . "/" . substr($this->lord, ($bk*2), 2) . "/" . substr($this->lord, ($pd*2),2);

		$nl++;
		if($nl == 9) $nl = 0;
		$str = substr($this->lord, ($nl*2), 2) . "/" . substr($this->lord, ($nl*2), 2) . " ";
		$str .= $this->jul2mdy($jd2);
		$returnArr[11] = $str;
		return $returnArr;
	}

	protected function calccurdasha($cd, $nl)
	{
	// check for > 120 years
		while($cd < 0) $cd += 43830;
		$len = 0;
		for($i = 0; $i < 9; $i++){
			$len += $this->dasha[nl] * 365.25;
			if($len > $cd) break;
			$nl++;
			if($nl == 9) $nl = 0; 
		}

		$cd = $len - $cd;
		$cd /= $this->dasha[$nl] * 365.25;
		$bk = $this->calcbhukti($cd, $nl);
		$pd = $this->calcpraty($cd, $nl);
		$str = substr($this->lord, ($nl*2), 2) . "/" . substr($this->lord, ($bk*2), 2) . "/" . substr($this->lord, ($pd*2),2);
		return $str;
	}

	protected function jul2mdy($JD)
	{
		$L = floor($JD + 0.5)+68569;
		$N = floor((4*$L)/146097);
		$L -= floor((146097*$N + 3)/4);
		$IT = floor((4000*($L+1))/1461001);
		$L -= floor((1461*$IT)/4) - 31;
		$JT = floor((80*$L)/2447);
		$K = $L- floor((2447*$JT)/80);
		$L = floor($JT/11);
		$JT += 2 - 12*$L;
		$IK = 100*($N-49) + $IT + $L;
		$str = "(M/D/Y) ";
		$str .= floor($JT);		// month 
		$str .= "/" . floor($K);	// day
		$str .= "/" . floor($IK);	// year
		return $str;
	}

	protected function lon2dmsz($x)
	{
		$x = abs($x);
		$d = floor($x);
		$m = ($x - $d);
		$s = $m * 60;
		$m = floor($s);
		$s = $s - $m;
		$z = floor($d/30);
		$d %= 30;
		$str = $d . "° " . $m . "' " . floor($s * 60) . "\" " . substr($this->zn, ($z*3), 3);
		return $str;
	}

	protected function getzodiac($x)
	{
		$x = abs($x);
		$d = floor($x);
		$m = ($x - $d);
		$s = $m * 60;
		$m = floor($s);
		$s = $s - $m;
		$z = floor($d/30);
		$d %= 30;
		$str = substr($this->zn, ($z*3), 3);
		return $str;
	}

	protected function mdy2julian($m, $d, $y)
	{
		$im = 12 * ($y + 4800) + $m - 3;
		$j = (2 * ($im - floor($im/12) * 12) + 7 + 365 * $im)/12;
		$j = floor($j) + $d + floor($im/48) - 32083;
		if($j > 2299171) $j += floor($im/4800) - floor($im/1200) + 38;
		return $j;
	}

	// keep within 360 degrees
	protected function fix360($v)
	{
		while($v < 0.0) $v += 360;
		while($v > 360) $v -= 360;
		return $v;
	}

	protected function ut2gst($t, $ut)
	{
		$t0 = 6.697374558 + (2400.051336 * $t) + (0.000025862 * $t * $t);
		$ut *= 1.002737909;
		$t0 += $ut;
		while($t0 < 0.0) $t0 += 24;
		while($t0 > 24.0) $t0 -= 24;
		return $t0;
	}

	protected function calcbhukti($db, $dp)
	{
		$x = 1 - $db; // find days elapsed
		$y = 0;
		$buk = $dp;
		for($i = 0; $i < 9; $i++){
			$y += $this->dasha[$buk]/120; // percentage of period
			if($y > $x) break;
			$buk++;
			if($buk == 9) $buk = 0;
		}
		return $buk; 
	}

	function calcpraty($db, $dp)
	{
		$x = 1 - $db; // find days elapsed
		$y = 0;
		$bk1 = $dp;
		for($i = 0; $i < 9; $i++){
			$y += $this->dasha[$bk1]/120; // percentage of period
			if($y > $x) break;
			$bk1++;
			if($bk1 == 9) $bk1 = 0;
		}
		$y = $y - $x; // find days left over
		$y = $y/($this->dasha[$bk1]/120);  // % of this bukti to go
		return $this->calcbhukti($y, $bk1);
	 }


	protected function calcayan($t)
	{
		$ln = 125.0445550 - 1934.1361849 * $t + 0.0020762 * $t * $t; // Mean lunar node
		$off = 280.466449 + 36000.7698231 * $t + 0.00031060 * $t * $t; // Mean Sun	
		$off = 17.23 * sin($this->d2r * $ln) + 1.27 * sin($this->d2r * $off)-(5025.64 + 1.11 * $t) * $t;
		$off = ($off- 85886.27)/3600.0;  
		return $off;
	}

	protected function ecl2equ($ln, $la, $ob)
	{
		$y = asin(sin($this->d2r * $la ) * cos($this->d2r * $ob ) + cos($this->d2r * $la ) * sin($this->d2r * $ob ) * sin($this->d2r * $ln));
		$this->dc = $this->r2d * $y;
		$y = sin($this->d2r * $ln ) * cos($this->d2r * $ob) - tan($this->d2r * $la) * sin($this->d2r * $ob);
		$x = cos($this->d2r * $ln);
		$x = atan2($y, $x);
		$x = $this->r2d * $x;
		if($x < 0.0) $x += 360;
		$this->ra = $x/15;
	}

	protected function equ2ecl($ra, $dc, $ob)
	{
		$ra *= 15;
		$y = sin($this->d2r * $ra) * cos($this->d2r * $ob) + tan($this->d2r * $dc) * sin($this->d2r * $ob);
		$x = cos($this->d2r * $ra);
		$x = atan2($y, $x);
		$x *= $this->r2d;
		if($x < 0) $x += 360;
		$this->pln = $x;
		$y = asin(sin($this->d2r * $dc) * cos($this->d2r * $ob) - cos($this->d2r * $dc) * sin($this->d2r * $ob) * sin($this->d2r * $ra));
		$this->pla = $this->r2d * $y;
	}

	public function points()
	{
		$arr = array();
		$arr['01']['01'] = 28;
		$arr['01']['02'] = 34;
		$arr['01']['03'] = 26;
		$arr['01']['03b'] = 18;
		$arr['01']['04'] = 23;
		$arr['01']['05'] = 23;
		$arr['01']['05b'] = 26;
		$arr['01']['06'] = 18;
		$arr['01']['07'] = 18;
		$arr['01']['07b'] = 21;
		$arr['01']['08'] = 29;
		$arr['01']['09'] = 25;
		$arr['01']['10'] = 19;
		$arr['01']['11'] = 25;
		$arr['01']['12'] = 15;
		$arr['01']['12b'] = 11;
		$arr['01']['13'] = 11;
		$arr['01']['14'] = 12;
		$arr['01']['14b'] = 22;
		$arr['01']['15'] = 29;
		$arr['01']['16'] = 22;
		$arr['01']['16b'] = 16;
		$arr['01']['17'] = 23;
		$arr['01']['18'] = 10;
		$arr['01']['19'] = 11;
		$arr['01']['20'] = 25;
		$arr['01']['21'] = 24;
		$arr['01']['21b'] = 27;
		$arr['01']['22'] = 28;
		$arr['01']['23'] = 20;
		$arr['01']['23b'] = 19;
		$arr['01']['24'] = 14;
		$arr['01']['25'] = 17;
		$arr['01']['25b'] = 14;
		$arr['01']['26'] = 23;
		$arr['01']['27'] = 25;
		$arr['02']['01'] = 33;
		$arr['02']['02'] = 28;
		$arr['02']['03'] = 28;
		$arr['02']['03b'] = 19;
		$arr['02']['04'] = 23;
		$arr['02']['05'] = 14;
		$arr['02']['05b'] = 17;
		$arr['02']['06'] = 26;
		$arr['02']['07'] = 25;
		$arr['02']['07b'] = 28;
		$arr['02']['08'] = 20;
		$arr['02']['09'] = 23;
		$arr['02']['10'] = 19;
		$arr['02']['11'] = 17;
		$arr['02']['12'] = 25;
		$arr['02']['12b'] = 21;
		$arr['02']['13'] = 18;
		$arr['02']['14'] = 4;
		$arr['02']['14b'] = 14;
		$arr['02']['15'] = 28;
		$arr['02']['16'] = 22;
		$arr['02']['16b'] = 16;
		$arr['02']['17'] = 14;
		$arr['02']['18'] = 17;
		$arr['02']['19'] = 19;
		$arr['02']['20'] = 17;
		$arr['02']['21'] = 25;
		$arr['02']['21b'] = 28;
		$arr['02']['22'] = 27;
		$arr['02']['23'] = 11;
		$arr['02']['23b'] = 10;
		$arr['02']['24'] = 20;
		$arr['02']['25'] = 24;
		$arr['02']['25b'] = 21;
		$arr['02']['26'] = 15;
		$arr['02']['27'] = 23;
		$arr['03']['01'] = 27;
		$arr['03']['02'] = 28;
		$arr['03']['03'] = 28;
		$arr['03']['03b'] = 19;
		$arr['03']['04'] = 11;
		$arr['03']['05'] = 18;
		$arr['03']['05b'] = 21;
		$arr['03']['06'] = 21;
		$arr['03']['07'] = 21;
		$arr['03']['07b'] = 24;
		$arr['03']['08'] = 26;
		$arr['03']['09'] = 21;
		$arr['03']['10'] = 15;
		$arr['03']['11'] = 19;
		$arr['03']['12'] = 20;
		$arr['03']['12b'] = 16;
		$arr['03']['13'] = 16;
		$arr['03']['14'] = 18;
		$arr['03']['14b'] = 28;
		$arr['03']['15'] = 16;
		$arr['03']['16'] = 20;
		$arr['03']['16b'] = 14;
		$arr['03']['17'] = 18;
		$arr['03']['18'] = 23;
		$arr['03']['19'] = 25;
		$arr['03']['20'] = 19;
		$arr['03']['21'] = 11;
		$arr['03']['21b'] = 14;
		$arr['03']['22'] = 14;
		$arr['03']['23'] = 26;
		$arr['03']['23b'] = 25;
		$arr['03']['24'] = 26;
		$arr['03']['25'] = 19;
		$arr['03']['25b'] = 16;
		$arr['03']['26'] = 18;
		$arr['03']['27'] = 10;
		$arr['03b']['01'] = 17;
		$arr['03b']['02'] = 18;
		$arr['03b']['03'] = 18;
		$arr['03b']['03b'] = 28;
		$arr['03b']['04'] = 20;
		$arr['03b']['05'] = 27;
		$arr['03b']['05b'] = 19;
		$arr['03b']['06'] = 19;
		$arr['03b']['07'] = 19;
		$arr['03b']['07b'] = 21;
		$arr['03b']['08'] = 23;
		$arr['03b']['09'] = 18;
		$arr['03b']['10'] = 16;
		$arr['03b']['11'] = 20;
		$arr['03b']['12'] = 21;
		$arr['03b']['12b'] = 20;
		$arr['03b']['13'] = 20;
		$arr['03b']['14'] = 23;
		$arr['03b']['14b'] = 23;
		$arr['03b']['15'] = 11;
		$arr['03b']['16'] = 15;
		$arr['03b']['16b'] = 19;
		$arr['03b']['17'] = 23;
		$arr['03b']['18'] = 28;
		$arr['03b']['19'] = 19;
		$arr['03b']['20'] = 14;
		$arr['03b']['21'] = 6;
		$arr['03b']['21b'] = 12;
		$arr['03b']['22'] = 12;
		$arr['03b']['23'] = 23;
		$arr['03b']['23b'] = 30;
		$arr['03b']['24'] = 31;
		$arr['03b']['25'] = 24;
		$arr['03b']['25b'] = 19;
		$arr['03b']['26'] = 21;
		$arr['03b']['27'] = 13;
		$arr['04']['01'] = 22;
		$arr['04']['02'] = 23;
		$arr['04']['03'] = 18;
		$arr['04']['03b'] = 18;
		$arr['04']['04'] = 28;
		$arr['04']['05'] = 35;
		$arr['04']['05b'] = 26;
		$arr['04']['06'] = 24;
		$arr['04']['07'] = 22;
		$arr['04']['07b'] = 24;
		$arr['04']['08'] = 25;
		$arr['04']['09'] = 11;
		$arr['04']['10'] = 9;
		$arr['04']['11'] = 23;
		$arr['04']['12'] = 26;
		$arr['04']['12b'] = 25;
		$arr['04']['13'] = 23;
		$arr['04']['14'] = 18;
		$arr['04']['14b'] = 18;
		$arr['04']['15'] = 14;
		$arr['04']['16'] = 9;
		$arr['04']['16b'] = 13;
		$arr['04']['17'] = 27;
		$arr['04']['18'] = 22;
		$arr['04']['19'] = 12;
		$arr['04']['20'] = 18;
		$arr['04']['21'] = 10;
		$arr['04']['21b'] = 16;
		$arr['04']['22'] = 17;
		$arr['04']['23'] = 19;
		$arr['04']['23b'] = 25;
		$arr['04']['24'] = 25;
		$arr['04']['25'] = 30;
		$arr['04']['25b'] = 25;
		$arr['04']['26'] = 26;
		$arr['04']['27'] = 17;
		$arr['05']['01'] = 22;
		$arr['05']['02'] = 14;
		$arr['05']['03'] = 16;
		$arr['05']['03b'] = 26;
		$arr['05']['04'] = 36;
		$arr['05']['05'] = 28;
		$arr['05']['05b'] = 19;
		$arr['05']['06'] = 25;
		$arr['05']['07'] = 23;
		$arr['05']['07b'] = 25;
		$arr['05']['08'] = 18;
		$arr['05']['09'] = 19;
		$arr['05']['10'] = 18;
		$arr['05']['11'] = 15;
		$arr['05']['12'] = 24;
		$arr['05']['12b'] = 24;
		$arr['05']['13'] = 24;
		$arr['05']['14'] = 10;
		$arr['05']['14b'] = 10;
		$arr['05']['15'] = 24;
		$arr['05']['16'] = 17;
		$arr['05']['16b'] = 21;
		$arr['05']['17'] = 20;
		$arr['05']['18'] = 29;
		$arr['05']['19'] = 12;
		$arr['05']['20'] = 20;
		$arr['05']['21'] = 16;
		$arr['05']['21b'] = 22;
		$arr['05']['22'] = 26;
		$arr['05']['23'] = 11;
		$arr['05']['23b'] = 17;
		$arr['05']['24'] = 26;
		$arr['05']['25'] = 30;
		$arr['05']['25b'] = 25;
		$arr['05']['26'] = 18;
		$arr['05']['27'] = 26;
		$arr['05b']['01'] = 25;
		$arr['05b']['02'] = 17;
		$arr['05b']['03'] = 19;
		$arr['05b']['03b'] = 17;
		$arr['05b']['04'] = 26;
		$arr['05b']['05'] = 18;
		$arr['05b']['05b'] = 28;
		$arr['05b']['06'] = 34;
		$arr['05b']['07'] = 31;
		$arr['05b']['07b'] = 17;
		$arr['05b']['08'] = 10;
		$arr['05b']['09'] = 11;
		$arr['05b']['10'] = 20;
		$arr['05b']['11'] = 18;
		$arr['05b']['12'] = 27;
		$arr['05b']['12b'] = 31;
		$arr['05b']['13'] = 32;
		$arr['05b']['14'] = 18;
		$arr['05b']['14b'] = 12;
		$arr['05b']['15'] = 26;
		$arr['05b']['16'] = 20;
		$arr['05b']['16b'] = 11;
		$arr['05b']['17'] = 10;
		$arr['05b']['18'] = 12;
		$arr['05b']['19'] = 21;
		$arr['05b']['20'] = 19;
		$arr['05b']['21'] = 25;
		$arr['05b']['21b'] = 19;
		$arr['05b']['22'] = 23;
		$arr['05b']['23'] = 8;
		$arr['05b']['23b'] = 11;
		$arr['05b']['24'] = 20;
		$arr['05b']['25'] = 23;
		$arr['05b']['25b'] = 24;
		$arr['05b']['26'] = 17;
		$arr['05b']['27'] = 25;
		$arr['06']['01'] = 16;
		$arr['06']['02'] = 25;
		$arr['06']['03'] = 19;
		$arr['06']['03b'] = 17;
		$arr['06']['04'] = 23;
		$arr['06']['05'] = 23;
		$arr['06']['05b'] = 33;
		$arr['06']['06'] = 28;
		$arr['06']['07'] = 24;
		$arr['06']['07b'] = 10;
		$arr['06']['08'] = 18;
		$arr['06']['09'] = 11;
		$arr['06']['10'] = 20;
		$arr['06']['11'] = 26;
		$arr['06']['12'] = 19;
		$arr['06']['12b'] = 21;
		$arr['06']['13'] = 18;
		$arr['06']['14'] = 26;
		$arr['06']['14b'] = 20;
		$arr['06']['15'] = 26;
		$arr['06']['16'] = 20;
		$arr['06']['16b'] = 12;
		$arr['06']['17'] = 15;
		$arr['06']['18'] = 2; //horo: 18 website: 2
		$arr['06']['19'] = 14;
		$arr['06']['20'] = 26;
		$arr['06']['21'] = 26;
		$arr['06']['21b'] = 24;
		$arr['06']['22'] = 19;
		$arr['06']['23'] = 16;
		$arr['06']['23b'] = 20;
		$arr['06']['24'] = 12;
		$arr['06']['25'] = 17;
		$arr['06']['25b'] = 17;
		$arr['06']['26'] = 25;
		$arr['06']['27'] = 24;
		$arr['07']['01'] = 17;
		$arr['07']['02'] = 25;
		$arr['07']['03'] = 19;
		$arr['07']['03b'] = 17;
		$arr['07']['04'] = 22;
		$arr['07']['05'] = 22;
		$arr['07']['05b'] = 31;
		$arr['07']['06'] = 25;
		$arr['07']['07'] = 28;
		$arr['07']['07b'] = 13;
		$arr['07']['08'] = 24;
		$arr['07']['09'] = 15;
		$arr['07']['10'] = 19;
		$arr['07']['11'] = 25;
		$arr['07']['12'] = 19;
		$arr['07']['12b'] = 22;
		$arr['07']['13'] = 23;
		$arr['07']['14'] = 24;
		$arr['07']['14b'] = 18;
		$arr['07']['15'] = 27;
		$arr['07']['16'] = 20;
		$arr['07']['16b'] = 12;
		$arr['07']['17'] = 19;
		$arr['07']['18'] = 4;
		$arr['07']['19'] = 12;
		$arr['07']['20'] = 27;
		$arr['07']['21'] = 27;
		$arr['07']['21b'] = 21;
		$arr['07']['22'] = 21;
		$arr['07']['23'] = 14;
		$arr['07']['23b'] = 17;
		$arr['07']['24'] = 12;
		$arr['07']['25'] = 17;
		$arr['07']['25b'] = 17;
		$arr['07']['26'] = 26;
		$arr['07']['27'] = 25;
		$arr['07b']['01'] = 22;
		$arr['07b']['02'] = 30;
		$arr['07b']['03'] = 24;
		$arr['07b']['03b'] = 21;
		$arr['07b']['04'] = 26;
		$arr['07b']['05'] = 26;
		$arr['07b']['05b'] = 18;
		$arr['07b']['06'] = 12;
		$arr['07b']['07'] = 14;
		$arr['07b']['07b'] = 28;
		$arr['07b']['08'] = 34;
		$arr['07b']['09'] = 27;
		$arr['07b']['10'] = 16;
		$arr['07b']['11'] = 22;
		$arr['07b']['12'] = 15;
		$arr['07b']['12b'] = 17;
		$arr['07b']['13'] = 18;
		$arr['07b']['14'] = 21;
		$arr['07b']['14b'] = 19;
		$arr['07b']['15'] = 27;
		$arr['07b']['16'] = 20;
		$arr['07b']['16b'] = 18;
		$arr['07b']['17'] = 25;
		$arr['07b']['18'] = 9;
		$arr['07b']['19'] = 9;
		$arr['07b']['20'] = 22;
		$arr['07b']['21'] = 22;
		$arr['07b']['21b'] = 28;
		$arr['07b']['22'] = 28;
		$arr['07b']['23'] = 21;
		$arr['07b']['23b'] = 12;
		$arr['07b']['24'] = 6;
		$arr['07b']['25'] = 12;
		$arr['07b']['25b'] = 17;
		$arr['07b']['26'] = 26;
		$arr['07b']['27'] = 24;
		$arr['08']['01'] = 30;
		$arr['08']['02'] = 22;
		$arr['08']['03'] = 26;
		$arr['08']['03b'] = 23;
		$arr['08']['04'] = 27;
		$arr['08']['05'] = 19;
		$arr['08']['05b'] = 11;
		$arr['08']['06'] = 20;
		$arr['08']['07'] = 21;
		$arr['08']['07b'] = 34;
		$arr['08']['08'] = 28;
		$arr['08']['09'] = 28;
		$arr['08']['10'] = 18;
		$arr['08']['11'] = 16;
		$arr['08']['12'] = 25;
		$arr['08']['12b'] = 27;
		$arr['08']['13'] = 26;
		$arr['08']['14'] = 11;
		$arr['08']['14b'] = 11;
		$arr['08']['15'] = 26;
		$arr['08']['16'] = 20;
		$arr['08']['16b'] = 18;
		$arr['08']['17'] = 17;
		$arr['08']['18'] = 19;
		$arr['08']['19'] = 17;
		$arr['08']['20'] = 14;
		$arr['08']['21'] = 22;
		$arr['08']['21b'] = 28;
		$arr['08']['22'] = 28;
		$arr['08']['23'] = 13;
		$arr['08']['23b'] = 4;
		$arr['08']['24'] = 13;
		$arr['08']['25'] = 19;
		$arr['08']['25b'] = 25;
		$arr['08']['26'] = 19;
		$arr['08']['27'] = 26;
		$arr['09']['01'] = 27;
		$arr['09']['02'] = 24;
		$arr['09']['03'] = 22;
		$arr['09']['03b'] = 19;
		$arr['09']['04'] = 12;
		$arr['09']['05'] = 21;
		$arr['09']['05b'] = 13;
		$arr['09']['06'] = 12;
		$arr['09']['07'] = 15;
		$arr['09']['07b'] = 28;
		$arr['09']['08'] = 29;
		$arr['09']['09'] = 28;
		$arr['09']['10'] = 16;
		$arr['09']['11'] = 16;
		$arr['09']['12'] = 18;
		$arr['09']['12b'] = 20;
		$arr['09']['13'] = 21;
		$arr['09']['14'] = 25;
		$arr['09']['14b'] = 25;
		$arr['09']['15'] = 13;
		$arr['09']['16'] = 17;
		$arr['09']['16b'] = 14;
		$arr['09']['17'] = 20;
		$arr['09']['18'] = 25;
		$arr['09']['19'] = 23;
		$arr['09']['20'] = 16;
		$arr['09']['21'] = 8;
		$arr['09']['21b'] = 14;
		$arr['09']['22'] = 14;
		$arr['09']['23'] = 27;
		$arr['09']['23b'] = 18;
		$arr['09']['24'] = 19;
		$arr['09']['25'] = 12;
		$arr['09']['25b'] = 17;
		$arr['09']['26'] = 20;
		$arr['09']['27'] = 13;
		$arr['10']['01'] = 20;
		$arr['10']['02'] = 19;
		$arr['10']['03'] = 15;
		$arr['10']['03b'] = 19;
		$arr['10']['04'] = 10;
		$arr['10']['05'] = 19;
		$arr['10']['05b'] = 22;
		$arr['10']['06'] = 21;
		$arr['10']['07'] = 21;
		$arr['10']['07b'] = 16;
		$arr['10']['08'] = 18;
		$arr['10']['09'] = 15;
		$arr['10']['10'] = 28;
		$arr['10']['11'] = 30;
		$arr['10']['12'] = 26;
		$arr['10']['12b'] = 15;
		$arr['10']['13'] = 16;
		$arr['10']['14'] = 20;
		$arr['10']['14b'] = 24;
		$arr['10']['15'] = 12;
		$arr['10']['16'] = 16;
		$arr['10']['16b'] = 24;
		$arr['10']['17'] = 24;
		$arr['10']['18'] = 31;
		$arr['10']['19'] = 24;
		$arr['10']['20'] = 19;
		$arr['10']['21'] = 8;
		$arr['10']['21b'] = 4;
		$arr['10']['22'] = 5;
		$arr['10']['23'] = 18;
		$arr['10']['23b'] = 24;
		$arr['10']['24'] = 25;
		$arr['10']['25'] = 18;
		$arr['10']['25b'] = 16;
		$arr['10']['26'] = 17;
		$arr['10']['27'] = 12;
		$arr['11']['01'] = 24;
		$arr['11']['02'] = 17;
		$arr['11']['03'] = 19;
		$arr['11']['03b'] = 21;
		$arr['11']['04'] = 24;
		$arr['11']['05'] = 15;
		$arr['11']['05b'] = 18;
		$arr['11']['06'] = 27;
		$arr['11']['07'] = 25;
		$arr['11']['07b'] = 20;
		$arr['11']['08'] = 14;
		$arr['11']['09'] = 15;
		$arr['11']['10'] = 30;
		$arr['11']['11'] = 28;
		$arr['11']['12'] = 34;
		$arr['11']['12b'] = 23;
		$arr['11']['13'] = 20;
		$arr['11']['14'] = 6;
		$arr['11']['14b'] = 10;
		$arr['11']['15'] = 24;
		$arr['11']['16'] = 18;
		$arr['11']['16b'] = 22;
		$arr['11']['17'] = 20;
		$arr['11']['18'] = 23;
		$arr['11']['19'] = 18;
		$arr['11']['20'] = 17;
		$arr['11']['21'] = 24;
		$arr['11']['21b'] = 20;
		$arr['11']['22'] = 18;
		$arr['11']['23'] = 4;
		$arr['11']['23b'] = 10;
		$arr['11']['24'] = 19;
		$arr['11']['25'] = 24;
		$arr['11']['25b'] = 22;
		$arr['11']['26'] = 15;
		$arr['11']['27'] = 22;
		$arr['12']['01'] = 14;
		$arr['12']['02'] = 24;
		$arr['12']['03'] = 20;
		$arr['12']['03b'] = 22;
		$arr['12']['04'] = 27;
		$arr['12']['05'] = 24;
		$arr['12']['05b'] = 27;
		$arr['12']['06'] = 20;
		$arr['12']['07'] = 19;
		$arr['12']['07b'] = 14;
		$arr['12']['08'] = 23;
		$arr['12']['09'] = 17;
		$arr['12']['10'] = 26;
		$arr['12']['11'] = 34;
		$arr['12']['12'] = 28;
		$arr['12']['12b'] = 17;
		$arr['12']['13'] = 15;
		$arr['12']['14'] = 13;
		$arr['12']['14b'] = 17;
		$arr['12']['15'] = 25;
		$arr['12']['16'] = 17;
		$arr['12']['16b'] = 21;
		$arr['12']['17'] = 28;
		$arr['12']['18'] = 15;
		$arr['12']['19'] = 9;
		$arr['12']['20'] = 25;
		$arr['12']['21'] = 25;
		$arr['12']['21b'] = 21;
		$arr['12']['22'] = 20;
		$arr['12']['23'] = 10;
		$arr['12']['23b'] = 18;
		$arr['12']['24'] = 11;
		$arr['12']['25'] = 16;
		$arr['12']['25b'] = 14;
		$arr['12']['26'] = 25;
		$arr['12']['27'] = 22;
		$arr['12b']['01'] = 9;
		$arr['12b']['02'] = 19;
		$arr['12b']['03'] = 15;
		$arr['12b']['03b'] = 20;
		$arr['12b']['04'] = 25;
		$arr['12b']['05'] = 23;
		$arr['12b']['05b'] = 31;
		$arr['12b']['06'] = 24;
		$arr['12b']['07'] = 23;
		$arr['12b']['07b'] = 16;
		$arr['12b']['08'] = 25;
		$arr['12b']['09'] = 19;
		$arr['12b']['10'] = 14;
		$arr['12b']['11'] = 24;
		$arr['12b']['12'] = 16;
		$arr['12b']['12b'] = 28;
		$arr['12b']['13'] = 26;
		$arr['12b']['14'] = 24;
		$arr['12b']['14b'] = 17;
		$arr['12b']['15'] = 25;
		$arr['12b']['16'] = 17;
		$arr['12b']['16b'] = 17;
		$arr['12b']['17'] = 24;
		$arr['12b']['18'] = 11;
		$arr['12b']['19'] = 13;
		$arr['12b']['20'] = 28;
		$arr['12b']['21'] = 28;
		$arr['12b']['21b'] = 24;
		$arr['12b']['22'] = 23;
		$arr['12b']['23'] = 15;
		$arr['12b']['23b'] = 17;
		$arr['12b']['24'] = 10;
		$arr['12b']['25'] = 15;
		$arr['12b']['25b'] = 16;
		$arr['12b']['26'] = 27;
		$arr['12b']['27'] = 24;
		$arr['13']['01'] = 10;
		$arr['13']['02'] = 18;
		$arr['13']['03'] = 14;
		$arr['13']['03b'] = 20;
		$arr['13']['04'] = 25;
		$arr['13']['05'] = 25;
		$arr['13']['05b'] = 34;
		$arr['13']['06'] = 24;
		$arr['13']['07'] = 24;
		$arr['13']['07b'] = 17;
		$arr['13']['08'] = 25;
		$arr['13']['09'] = 19;
		$arr['13']['10'] = 14;
		$arr['13']['11'] = 20;
		$arr['13']['12'] = 15;
		$arr['13']['12b'] = 27;
		$arr['13']['13'] = 28;
		$arr['13']['14'] = 27;
		$arr['13']['14b'] = 20;
		$arr['13']['15'] = 27;
		$arr['13']['16'] = 18;
		$arr['13']['16b'] = 19;
		$arr['13']['17'] = 25;
		$arr['13']['18'] = 11;
		$arr['13']['19'] = 13;
		$arr['13']['20'] = 27;
		$arr['13']['21'] = 28;
		$arr['13']['21b'] = 24;
		$arr['13']['22'] = 24;
		$arr['13']['23'] = 17;
		$arr['13']['23b'] = 19;
		$arr['13']['24'] = 10;
		$arr['13']['25'] = 15;
		$arr['13']['25b'] = 16;
		$arr['13']['26'] = 26;
		$arr['13']['27'] = 25;
		$arr['14']['01'] = 12;
		$arr['14']['02'] = 3;
		$arr['14']['03'] = 17;
		$arr['14']['03b'] = 23;
		$arr['14']['04'] = 18;
		$arr['14']['05'] = 11;
		$arr['14']['05b'] = 20;
		$arr['14']['06'] = 27;
		$arr['14']['07'] = 26;
		$arr['14']['07b'] = 19;
		$arr['14']['08'] = 11;
		$arr['14']['09'] = 24;
		$arr['14']['10'] = 19;
		$arr['14']['11'] = 5;
		$arr['14']['12'] = 12;
		$arr['14']['12b'] = 24;
		$arr['14']['13'] = 28;
		$arr['14']['14'] = 28;
		$arr['14']['14b'] = 21;
		$arr['14']['15'] = 21;
		$arr['14']['16'] = 26;
		$arr['14']['16b'] = 26;
		$arr['14']['17'] = 11;
		$arr['14']['18'] = 24;
		$arr['14']['19'] = 26;
		$arr['14']['20'] = 12;
		$arr['14']['21'] = 20;
		$arr['14']['21b'] = 15;
		$arr['14']['22'] = 17;
		$arr['14']['23'] = 15;
		$arr['14']['23b'] = 17;
		$arr['14']['24'] = 25;
		$arr['14']['25'] = 17;
		$arr['14']['25b'] = 18;
		$arr['14']['26'] = 9;
		$arr['14']['27'] = 19;
		$arr['14b']['01'] = 22;
		$arr['14b']['02'] = 13;
		$arr['14b']['03'] = 27;
		$arr['14b']['03b'] = 22;
		$arr['14b']['04'] = 17;
		$arr['14b']['05'] = 10;
		$arr['14b']['05b'] = 13;
		$arr['14b']['06'] = 20;
		$arr['14b']['07'] = 19;
		$arr['14b']['07b'] = 19;
		$arr['14b']['08'] = 11;
		$arr['14b']['09'] = 24;
		$arr['14b']['10'] = 23;
		$arr['14b']['11'] = 9;
		$arr['14b']['12'] = 16;
		$arr['14b']['12b'] = 16;
		$arr['14b']['13'] = 20;
		$arr['14b']['14'] = 20;
		$arr['14b']['14b'] = 28;
		$arr['14b']['15'] = 28;
		$arr['14b']['16'] = 33;
		$arr['14b']['16b'] = 21;
		$arr['14b']['17'] = 6;
		$arr['14b']['18'] = 19;
		$arr['14b']['19'] = 26;
		$arr['14b']['20'] = 12;
		$arr['14b']['21'] = 20;
		$arr['14b']['21b'] = 12;
		$arr['14b']['22'] = 24;
		$arr['14b']['23'] = 22;
		$arr['14b']['23b'] = 18;
		$arr['14b']['24'] = 26;
		$arr['14b']['25'] = 18;
		$arr['14b']['25b'] = 11;
		$arr['14b']['26'] = 2;
		$arr['14b']['27'] = 12;
		$arr['15']['01'] = 28;
		$arr['15']['02'] = 28;
		$arr['15']['03'] = 14;
		$arr['15']['03b'] = 9;
		$arr['15']['04'] = 15;
		$arr['15']['05'] = 24;
		$arr['15']['05b'] = 27;
		$arr['15']['06'] = 27;
		$arr['15']['07'] = 27;
		$arr['15']['07b'] = 26;
		$arr['15']['08'] = 25;
		$arr['15']['09'] = 11;
		$arr['15']['10'] = 10;
		$arr['15']['11'] = 24;
		$arr['15']['12'] = 25;
		$arr['15']['12b'] = 25;
		$arr['15']['13'] = 26;
		$arr['15']['14'] = 19;
		$arr['15']['14b'] = 27;
		$arr['15']['15'] = 28;
		$arr['15']['16'] = 19;
		$arr['15']['16b'] = 7;
		$arr['15']['17'] = 20;
		$arr['15']['18'] = 14;
		$arr['15']['19'] = 21;
		$arr['15']['20'] = 27;
		$arr['15']['21'] = 19;
		$arr['15']['21b'] = 21;
		$arr['15']['22'] = 21;
		$arr['15']['23'] = 24;
		$arr['15']['23b'] = 20;
		$arr['15']['24'] = 21;
		$arr['15']['25'] = 26;
		$arr['15']['25b'] = 18;
		$arr['15']['26'] = 19;
		$arr['15']['27'] = 10;
		$arr['16']['01'] = 22;
		$arr['16']['02'] = 21;
		$arr['16']['03'] = 19;
		$arr['16']['03b'] = 14;
		$arr['16']['04'] = 8;
		$arr['16']['05'] = 17;
		$arr['16']['05b'] = 19;
		$arr['16']['06'] = 20;
		$arr['16']['07'] = 21;
		$arr['16']['07b'] = 20;
		$arr['16']['08'] = 20;
		$arr['16']['09'] = 16;
		$arr['16']['10'] = 15;
		$arr['16']['11'] = 18;
		$arr['16']['12'] = 17;
		$arr['16']['12b'] = 16;
		$arr['16']['13'] = 16;
		$arr['16']['14'] = 28;
		$arr['16']['14b'] = 34;
		$arr['16']['15'] = 20;
		$arr['16']['16'] = 28;
		$arr['16']['16b'] = 15;
		$arr['16']['17'] = 16;
		$arr['16']['18'] = 20;
		$arr['16']['19'] = 26;
		$arr['16']['20'] = 20;
		$arr['16']['21'] = 12;
		$arr['16']['21b'] = 14;
		$arr['16']['22'] = 14;
		$arr['16']['23'] = 28;
		$arr['16']['23b'] = 24;
		$arr['16']['24'] = 26;
		$arr['16']['25'] = 20;
		$arr['16']['25b'] = 12;
		$arr['16']['26'] = 11;
		$arr['16']['27'] = 4;
		$arr['16b']['01'] = 18;
		$arr['16b']['02'] = 18;
		$arr['16b']['03'] = 16;
		$arr['16b']['03b'] = 21;
		$arr['16b']['04'] = 14;
		$arr['16b']['05'] = 23;
		$arr['16b']['05b'] = 13;
		$arr['16b']['06'] = 13;
		$arr['16b']['07'] = 14;
		$arr['16b']['07b'] = 19;
		$arr['16b']['08'] = 19;
		$arr['16b']['09'] = 14;
		$arr['16b']['10'] = 22;
		$arr['16b']['11'] = 23;
		$arr['16b']['12'] = 22;
		$arr['16b']['12b'] = 18;
		$arr['16b']['13'] = 20;
		$arr['16b']['14'] = 27;
		$arr['16b']['14b'] = 22;
		$arr['16b']['15'] = 9;
		$arr['16b']['16'] = 16;
		$arr['16b']['16b'] = 28;
		$arr['16b']['17'] = 28;
		$arr['16b']['18'] = 31;
		$arr['16b']['19'] = 22;
		$arr['16b']['20'] = 16;
		$arr['16b']['21'] = 8;
		$arr['16b']['21b'] = 12;
		$arr['16b']['22'] = 12;
		$arr['16b']['23'] = 26;
		$arr['16b']['23b'] = 25;
		$arr['16b']['24'] = 26;
		$arr['16b']['25'] = 20;
		$arr['16b']['25b'] = 19;
		$arr['16b']['26'] = 18;
		$arr['16b']['27'] = 10;
		$arr['17']['01'] = 24;
		$arr['17']['02'] = 17;
		$arr['17']['03'] = 19;
		$arr['17']['03b'] = 24;
		$arr['17']['04'] = 29;
		$arr['17']['05'] = 21;
		$arr['17']['05b'] = 11;
		$arr['17']['06'] = 19;
		$arr['17']['07'] = 20;
		$arr['17']['07b'] = 25;
		$arr['17']['08'] = 17;
		$arr['17']['09'] = 19;
		$arr['17']['10'] = 24;
		$arr['17']['11'] = 22;
		$arr['17']['12'] = 30;
		$arr['17']['12b'] = 27;
		$arr['17']['13'] = 26;
		$arr['17']['14'] = 11;
		$arr['17']['14b'] = 6;
		$arr['17']['15'] = 21;
		$arr['17']['16'] = 16;
		$arr['17']['16b'] = 27;
		$arr['17']['17'] = 28;
		$arr['17']['18'] = 30; //horo: 27, website: 30
		$arr['17']['19'] = 16;
		$arr['17']['20'] = 15;
		$arr['17']['21'] = 23;
		$arr['17']['21b'] = 27;
		$arr['17']['22'] = 27;
		$arr['17']['23'] = 12;
		$arr['17']['23b'] = 11;
		$arr['17']['24'] = 20;
		$arr['17']['25'] = 26;
		$arr['17']['25b'] = 25;
		$arr['17']['26'] = 18;
		$arr['17']['27'] = 26;
		$arr['18']['01'] = 13;
		$arr['18']['02'] = 19;
		$arr['18']['03'] = 25;
		$arr['18']['03b'] = 30;
		$arr['18']['04'] = 23;
		$arr['18']['05'] = 24;
		$arr['18']['05b'] = 14;
		$arr['18']['06'] = 3; //horo: 15, website: 3
		$arr['18']['07'] = 7; //horo: 15, website: 7
		$arr['18']['07b'] = 10;  //horo: 19.5, website: 10
		$arr['18']['08'] = 20;
		$arr['18']['09'] = 25;
		$arr['18']['10'] = 32;
		$arr['18']['11'] = 24;
		$arr['18']['12'] = 16;
		$arr['18']['12b'] = 12;
		$arr['18']['13'] = 13;
		$arr['18']['14'] = 25; //horo: 25, website: 25
		$arr['18']['14b'] = 20; //horo: 6.5, website: 20
		$arr['18']['15'] = 16;
		$arr['18']['16'] = 21;
		$arr['18']['16b'] = 31;
		$arr['18']['17'] = 31; //horo: 27, website: 31
		$arr['18']['18'] = 28;
		$arr['18']['19'] = 16;
		$arr['18']['20'] = 17;
		$arr['18']['21'] = 17;
		$arr['18']['21b'] = 21;
		$arr['18']['22'] = 21;
		$arr['18']['23'] = 26;
		$arr['18']['23b'] = 25;
		$arr['18']['24'] = 18;
		$arr['18']['25'] = 11; //horo: 21, website: 11
		$arr['18']['25b'] = 9;
		$arr['18']['26'] = 20;
		$arr['18']['27'] = 21;
		$arr['19']['01'] = 12;
		$arr['19']['02'] = 19;
		$arr['19']['03'] = 25;
		$arr['19']['03b'] = 22;
		$arr['19']['04'] = 13;
		$arr['19']['05'] = 14;
		$arr['19']['05b'] = 23;
		$arr['19']['06'] = 15;
		$arr['19']['07'] = 14;
		$arr['19']['07b'] = 7;
		$arr['19']['08'] = 17;
		$arr['19']['09'] = 22;
		$arr['19']['10'] = 24;
		$arr['19']['11'] = 20;
		$arr['19']['12'] = 9;
		$arr['19']['12b'] = 14;
		$arr['19']['13'] = 15;
		$arr['19']['14'] = 27;
		$arr['19']['14b'] = 27;
		$arr['19']['15'] = 23;
		$arr['19']['16'] = 27;
		$arr['19']['16b'] = 21;
		$arr['19']['17'] = 15;
		$arr['19']['18'] = 14;
		$arr['19']['19'] = 28;
		$arr['19']['20'] = 27;
		$arr['19']['21'] = 25;
		$arr['19']['21b'] = 14;
		$arr['19']['22'] = 14;
		$arr['19']['23'] = 20;
		$arr['19']['23b'] = 29;
		$arr['19']['24'] = 22;
		$arr['19']['25'] = 15;
		$arr['19']['25b'] = 14;
		$arr['19']['26'] = 23;
		$arr['19']['27'] = 26;
		$arr['20']['01'] = 24;
		$arr['20']['02'] = 17;
		$arr['20']['03'] = 19;
		$arr['20']['03b'] = 15;
		$arr['20']['04'] = 19;
		$arr['20']['05'] = 10;
		$arr['20']['05b'] = 19;
		$arr['20']['06'] = 28;
		$arr['20']['07'] = 24;
		$arr['20']['07b'] = 20;
		$arr['20']['08'] = 12;
		$arr['20']['09'] = 15;
		$arr['20']['10'] = 19;
		$arr['20']['11'] = 17;
		$arr['20']['12'] = 25;
		$arr['20']['12b'] = 29;
		$arr['20']['13'] = 27;
		$arr['20']['14'] = 13;
		$arr['20']['14b'] = 13;
		$arr['20']['15'] = 27;
		$arr['20']['16'] = 21;
		$arr['20']['16b'] = 15;
		$arr['20']['17'] = 13;
		$arr['20']['18'] = 16;
		$arr['20']['19'] = 28;
		$arr['20']['20'] = 28;
		$arr['20']['21'] = 35;
		$arr['20']['21b'] = 24;
		$arr['20']['22'] = 22;
		$arr['20']['23'] = 6;
		$arr['20']['23b'] = 15;
		$arr['20']['24'] = 24;
		$arr['20']['25'] = 29;
		$arr['20']['25b'] = 28;
		$arr['20']['26'] = 21;
		$arr['20']['27'] = 28;
		$arr['21']['01'] = 23;
		$arr['21']['02'] = 25;
		$arr['21']['03'] = 11;
		$arr['21']['03b'] = 7;
		$arr['21']['04'] = 11;
		$arr['21']['05'] = 16;
		$arr['21']['05b'] = 25;
		$arr['21']['06'] = 27;
		$arr['21']['07'] = 27;
		$arr['21']['07b'] = 20;
		$arr['21']['08'] = 20;
		$arr['21']['09'] = 7;
		$arr['21']['10'] = 8;
		$arr['21']['11'] = 24;
		$arr['21']['12'] = 25;
		$arr['21']['12b'] = 29;
		$arr['21']['13'] = 28;
		$arr['21']['14'] = 21;
		$arr['21']['14b'] = 21;
		$arr['21']['15'] = 19;
		$arr['21']['16'] = 13;
		$arr['21']['16b'] = 7;
		$arr['21']['17'] = 21;
		$arr['21']['18'] = 16;
		$arr['21']['19'] = 15;
		$arr['21']['20'] = 34;
		$arr['21']['21'] = 28;
		$arr['21']['21b'] = 17;
		$arr['21']['22'] = 15;
		$arr['21']['23'] = 14;
		$arr['21']['23b'] = 23;
		$arr['21']['24'] = 24;
		$arr['21']['25'] = 29;
		$arr['21']['25b'] = 28;
		$arr['21']['26'] = 29;
		$arr['21']['27'] = 20;
		$arr['21b']['01'] = 25;
		$arr['21b']['02'] = 27;
		$arr['21b']['03'] = 13;
		$arr['21b']['03b'] = 12;
		$arr['21b']['04'] = 16;
		$arr['21b']['05'] = 21;
		$arr['21b']['05b'] = 19;
		$arr['21b']['06'] = 21;
		$arr['21b']['07'] = 21;
		$arr['21b']['07b'] = 26;
		$arr['21b']['08'] = 26;
		$arr['21b']['09'] = 13;
		$arr['21b']['10'] = 3;
		$arr['21b']['11'] = 19;
		$arr['21b']['12'] = 20;
		$arr['21b']['12b'] = 24;
		$arr['21b']['13'] = 23;
		$arr['21b']['14'] = 15;
		$arr['21b']['14b'] = 23;
		$arr['21b']['15'] = 21;
		$arr['21b']['16'] = 15;
		$arr['21b']['16b'] = 11;
		$arr['21b']['17'] = 25;
		$arr['21b']['18'] = 20;
		$arr['21b']['19'] = 13;
		$arr['21b']['20'] = 22;
		$arr['21b']['21'] = 16;
		$arr['21b']['21b'] = 28;
		$arr['21b']['22'] = 26;
		$arr['21b']['23'] = 25;
		$arr['21b']['23b'] = 16;
		$arr['21b']['24'] = 17;
		$arr['21b']['25'] = 22;
		$arr['21b']['25b'] = 28;
		$arr['21b']['26'] = 29;
		$arr['21b']['27'] = 23;
		$arr['22']['01'] = 26;
		$arr['22']['02'] = 26;
		$arr['22']['03'] = 13;
		$arr['22']['03b'] = 10;
		$arr['22']['04'] = 18;
		$arr['22']['05'] = 26;
		$arr['22']['05b'] = 24;
		$arr['22']['06'] = 22;
		$arr['22']['07'] = 22;
		$arr['22']['07b'] = 27;
		$arr['22']['08'] = 27;
		$arr['22']['09'] = 13;
		$arr['22']['10'] = 4;
		$arr['22']['11'] = 18;
		$arr['22']['12'] = 20;
		$arr['22']['12b'] = 24;
		$arr['22']['13'] = 24;
		$arr['22']['14'] = 17;
		$arr['22']['14b'] = 25;
		$arr['22']['15'] = 22;
		$arr['22']['16'] = 16;
		$arr['22']['16b'] = 11;
		$arr['22']['17'] = 26;
		$arr['22']['18'] = 20;
		$arr['22']['19'] = 14;
		$arr['22']['20'] = 22;
		$arr['22']['21'] = 15;
		$arr['22']['21b'] = 27;
		$arr['22']['22'] = 28;
		$arr['22']['23'] = 27;
		$arr['22']['23b'] = 20;
		$arr['22']['24'] = 17;
		$arr['22']['25'] = 22;
		$arr['22']['25b'] = 29;
		$arr['22']['26'] = 29;
		$arr['22']['27'] = 21;
		$arr['23']['01'] = 20;
		$arr['23']['02'] = 10;
		$arr['23']['03'] = 25;
		$arr['23']['03b'] = 23;
		$arr['23']['04'] = 19;
		$arr['23']['05'] = 12;
		$arr['23']['05b'] = 10;
		$arr['23']['06'] = 17;
		$arr['23']['07'] = 16;
		$arr['23']['07b'] = 21;
		$arr['23']['08'] = 13;
		$arr['23']['09'] = 26;
		$arr['23']['10'] = 17;
		$arr['23']['11'] = 5;
		$arr['23']['12'] = 11;
		$arr['23']['12b'] = 16;
		$arr['23']['13'] = 18;
		$arr['23']['14'] = 15;
		$arr['23']['14b'] = 23;
		$arr['23']['15'] = 26;
		$arr['23']['16'] = 29;
		$arr['23']['16b'] = 25;
		$arr['23']['17'] = 12;
		$arr['23']['18'] = 25;
		$arr['23']['19'] = 19;
		$arr['23']['20'] = 5;
		$arr['23']['21'] = 13;
		$arr['23']['21b'] = 25;
		$arr['23']['22'] = 27;
		$arr['23']['23'] = 28;
		$arr['23']['23b'] = 18;
		$arr['23']['24'] = 24;
		$arr['23']['25'] = 19;
		$arr['23']['25b'] = 24;
		$arr['23']['26'] = 14;
		$arr['23']['27'] = 22;
		$arr['23b']['01'] = 19;
		$arr['23b']['02'] = 9;
		$arr['23b']['03'] = 24;
		$arr['23b']['03b'] = 29;
		$arr['23b']['04'] = 24;
		$arr['23b']['05'] = 17;
		$arr['23b']['05b'] = 12;
		$arr['23b']['06'] = 19;
		$arr['23b']['07'] = 18;
		$arr['23b']['07b'] = 12;
		$arr['23b']['08'] = 4;
		$arr['23b']['09'] = 17;
		$arr['23b']['10'] = 23;
		$arr['23b']['11'] = 9;
		$arr['23b']['12'] = 17;
		$arr['23b']['12b'] = 16;
		$arr['23b']['13'] = 19;
		$arr['23b']['14'] = 16;
		$arr['23b']['14b'] = 18;
		$arr['23b']['15'] = 21;
		$arr['23b']['16'] = 24;
		$arr['23b']['16b'] = 24;
		$arr['23b']['17'] = 11;
		$arr['23b']['18'] = 24;
		$arr['23b']['19'] = 28;
		$arr['23b']['20'] = 14;
		$arr['23b']['21'] = 22;
		$arr['23b']['21b'] = 15;
		$arr['23b']['22'] = 19;
		$arr['23b']['23'] = 17;
		$arr['23b']['23b'] = 28;
		$arr['23b']['24'] = 33;
		$arr['23b']['25'] = 27;
		$arr['23b']['25b'] = 15;
		$arr['23b']['26'] = 5;
		$arr['23b']['27'] = 13;
		$arr['24']['01'] = 14;
		$arr['24']['02'] = 19;
		$arr['24']['03'] = 25;
		$arr['24']['03b'] = 30;
		$arr['24']['04'] = 24;
		$arr['24']['05'] = 26;
		$arr['24']['05b'] = 21;
		$arr['24']['06'] = 12;
		$arr['24']['07'] = 13;
		$arr['24']['07b'] = 5;
		$arr['24']['08'] = 13;
		$arr['24']['09'] = 18;
		$arr['24']['10'] = 24;
		$arr['24']['11'] = 18;
		$arr['24']['12'] = 10;
		$arr['24']['12b'] = 9;
		$arr['24']['13'] = 10;
		$arr['24']['14'] = 24;
		$arr['24']['14b'] = 26;
		$arr['24']['15'] = 22;
		$arr['24']['16'] = 26;
		$arr['24']['16b'] = 25;
		$arr['24']['17'] = 20;
		$arr['24']['18'] = 17;
		$arr['24']['19'] = 21;
		$arr['24']['20'] = 23;
		$arr['24']['21'] = 23;
		$arr['24']['21b'] = 16;
		$arr['24']['22'] = 17;
		$arr['24']['23'] = 23;
		$arr['24']['23b'] = 33;
		$arr['24']['24'] = 28;
		$arr['24']['25'] = 19;
		$arr['24']['25b'] = 7;
		$arr['24']['26'] = 14;
		$arr['24']['27'] = 15;
		$arr['25']['01'] = 15;
		$arr['25']['02'] = 23;
		$arr['25']['03'] = 18;
		$arr['25']['03b'] = 23;
		$arr['25']['04'] = 29;
		$arr['25']['05'] = 28;
		$arr['25']['05b'] = 22;
		$arr['25']['06'] = 17;
		$arr['25']['07'] = 16;
		$arr['25']['07b'] = 9;
		$arr['25']['08'] = 17;
		$arr['25']['09'] = 11;
		$arr['25']['10'] = 17;
		$arr['25']['11'] = 23;
		$arr['25']['12'] = 15;
		$arr['25']['12b'] = 14;
		$arr['25']['13'] = 13;
		$arr['25']['14'] = 16;
		$arr['25']['14b'] = 18;
		$arr['25']['15'] = 25;
		$arr['25']['16'] = 20;
		$arr['25']['16b'] = 19;
		$arr['25']['17'] = 24;
		$arr['25']['18'] = 10;
		$arr['25']['19'] = 14;
		$arr['25']['20'] = 28;
		$arr['25']['21'] = 29;
		$arr['25']['21b'] = 21;
		$arr['25']['22'] = 20;
		$arr['25']['23'] = 17;
		$arr['25']['23b'] = 27;
		$arr['25']['24'] = 19;
		$arr['25']['25'] = 28;
		$arr['25']['25b'] = 15;
		$arr['25']['26'] = 21;
		$arr['25']['27'] = 17;
		$arr['25b']['01'] = 14;
		$arr['25b']['02'] = 22;
		$arr['25b']['03'] = 17;
		$arr['25b']['03b'] = 20;
		$arr['25b']['04'] = 26;
		$arr['25b']['05'] = 25;
		$arr['25b']['05b'] = 24;
		$arr['25b']['06'] = 18;
		$arr['25b']['07'] = 17;
		$arr['25b']['07b'] = 16;
		$arr['25b']['08'] = 26;
		$arr['25b']['09'] = 17;
		$arr['25b']['10'] = 17;
		$arr['25b']['11'] = 23;
		$arr['25b']['12'] = 15;
		$arr['25b']['12b'] = 17;
		$arr['25b']['13'] = 16;
		$arr['25b']['14'] = 19;
		$arr['25b']['14b'] = 12;
		$arr['25b']['15'] = 18;
		$arr['25b']['16'] = 13;
		$arr['25b']['16b'] = 19;
		$arr['25b']['17'] = 24;
		$arr['25b']['18'] = 9;
		$arr['25b']['19'] = 16;
		$arr['25b']['20'] = 29;
		$arr['25b']['21'] = 29;
		$arr['25b']['21b'] = 29;
		$arr['25b']['22'] = 28;
		$arr['25b']['23'] = 24;
		$arr['25b']['23b'] = 17;
		$arr['25b']['24'] = 8;
		$arr['25b']['25'] = 16;
		$arr['25b']['25b'] = 28;
		$arr['25b']['26'] = 33;
		$arr['25b']['27'] = 29;
		$arr['26']['01'] = 23;
		$arr['26']['02'] = 16;
		$arr['26']['03'] = 19;
		$arr['26']['03b'] = 22;
		$arr['26']['04'] = 27;
		$arr['26']['05'] = 18;
		$arr['26']['05b'] = 17;
		$arr['26']['06'] = 26;
		$arr['26']['07'] = 26;
		$arr['26']['07b'] = 25;
		$arr['26']['08'] = 18;
		$arr['26']['09'] = 20;
		$arr['26']['10'] = 18;
		$arr['26']['11'] = 16;
		$arr['26']['12'] = 26;
		$arr['26']['12b'] = 28;
		$arr['26']['13'] = 26;
		$arr['26']['14'] = 10;
		$arr['26']['14b'] = 3;
		$arr['26']['15'] = 19;
		$arr['26']['16'] = 12;
		$arr['26']['16b'] = 18;
		$arr['26']['17'] = 17;
		$arr['26']['18'] = 20;
		$arr['26']['19'] = 24;
		$arr['26']['20'] = 22;
		$arr['26']['21'] = 30;
		$arr['26']['21b'] = 30;
		$arr['26']['22'] = 29;
		$arr['26']['23'] = 15;
		$arr['26']['23b'] = 6;
		$arr['26']['24'] = 14;
		$arr['26']['25'] = 22;
		$arr['26']['25b'] = 33;
		$arr['26']['26'] = 28;
		$arr['26']['27'] = 33;
		$arr['27']['01'] = 26;
		$arr['27']['02'] = 25;
		$arr['27']['03'] = 10;
		$arr['27']['03b'] = 13;
		$arr['27']['04'] = 19;
		$arr['27']['05'] = 27;
		$arr['27']['05b'] = 26;
		$arr['27']['06'] = 26;
		$arr['27']['07'] = 26;
		$arr['27']['07b'] = 24;
		$arr['27']['08'] = 26;
		$arr['27']['09'] = 12;
		$arr['27']['10'] = 12;
		$arr['27']['11'] = 24;
		$arr['27']['12'] = 24;
		$arr['27']['12b'] = 26;
		$arr['27']['13'] = 26;
		$arr['27']['14'] = 19;
		$arr['27']['14b'] = 12;
		$arr['27']['15'] = 11;
		$arr['27']['16'] = 5;
		$arr['27']['16b'] = 9;
		$arr['27']['17'] = 26;
		$arr['27']['18'] = 20;
		$arr['27']['19'] = 26;
		$arr['27']['20'] = 30;
		$arr['27']['21'] = 22;
		$arr['27']['21b'] = 22;
		$arr['27']['22'] = 23;
		$arr['27']['23'] = 22;
		$arr['27']['23b'] = 13;
		$arr['27']['24'] = 15;
		$arr['27']['25'] = 19;
		$arr['27']['25b'] = 30;
		$arr['27']['26'] = 34;
		$arr['27']['27'] = 28;
		return $arr;
	}
	public function getpoints($from, $to)
	{
		$arr = array();
		$arr = $this->points();
		return $arr[$from][$to];
	}

	public function interpret($pts)
	{
		if ($pts < 11) {
			return 'Very Bad Match';
		} else if ($pts < 18) {
			return 'Bad Match';
		} else if ($pts < 25) {
			return 'Normal Match';
		} else if ($pts < 31) {
			return 'Good Match';
		} else if ($pts < 36) {
			return 'Very Good Match';
		}
	}
}

/*
$Horo = new Kundali;
$returnArr = $Horo->precalculate($mon=6, $day=5, $year=1974, $hr=12, $min=30, $zhour=5, $zmin=30, $lnd=73, $lnm=10, $lad=19, $lam=10, $dst='', $eln=1, $sla='');
print_r($returnArr);
$from = $returnArr[9];
$returnArr = $Horo->precalculate($mon=6, $day=6, $year=2009, $hr=18, $min=10, $zhour=5, $zmin=30, $lnd=73, $lnm=10, $lad=19, $lam=10, $dst='', $eln=1, $sla='');
$to = $returnArr[9];
print_r($returnArr);
$points = $Horo->getpoints($from, $to);
echo $points;
*/
?>