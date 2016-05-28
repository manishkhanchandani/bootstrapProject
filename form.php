<?php
if (!empty($_POST)) {
  echo '<pre>';
  print_r($_POST);
  echo '</pre>';

}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<h1>Forms</h1>


<form id="form1" name="form1" method="post">
  <p>
    <label for="username">Username:</label>
    <input type="text" name="username" id="username">
  </p>
  <p>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password">
  </p>
  <p>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
  </p>
  <p>
    <label for="email">Email:</label>
    <input type="text" name="email" id="email">
  </p>
  <p>
    <label for="phone">Phone:</label>
    <input type="text" name="phone" id="phone">
  </p>
  <p><label for="gender_male">Gender:</label>
    <input type="radio" name="gender" id="gender_male" value="male">
    <label for="radio">Male </label>
    <input type="radio" name="gender" id="gender_female" value="female">
    <label for="radio2">Female </label>
  </p>
  <p>Marital Status: 
    <input type="radio" name="marital_status" id="marital_status_single" value="single">
    <label for="radio">Single </label>
    <input type="radio" name="marital_status" id="marital_status_separated" value="separated">
    <label for="radio2">Separated </label>
    <input type="radio" name="marital_status" id="marital_status_divorced" value="divorced">
    <label for="radio3">Divorced </label>
    <input type="radio" name="marital_status" id="marital_status_widow" value="widow">
    <label for="radio4">Widow </label>
  </p>
  <p>Highest education: 
    <input type="radio" name="education" id="education_phd" value="education_phd">
    <label for="radio">PH.D. </label>
    <input type="radio" name="education" id="education_masters" value="education_masters">
    <label for="radio2">Masters </label>
    <input type="radio" name="education" id="education_bachelor" value="education_bachelor">
    <label for="radio3">Bachelor </label>
    <input type="radio" name="education" id="education_xii" value="education_xii">
    <label for="radio4">XII </label>
  </p>
  <p>Hobbies: 
    <input type="checkbox" name="singing" id="singing">
    <label for="singing">Singing </label>
    <input type="checkbox" name="dancing" id="dancing">
    <label for="dancing">Dancing </label>
    <input type="checkbox" name="criket" id="cricket">
    <label for="checkbox">Cricket </label>
    <input type="checkbox" name="guitar" id="guitar">
    <label for="checkbox">Guitar </label>
  </p>
  <p>
    <label for="haircolor">Profession:</label>
    <select name="profession" id="profession">
      <option value="">Select your profession:</option>
      <option value="doctor">Doctor</option>
      <option value="engineer">Engineer</option>
      <option value="lawyer">Lawyer</option>
      <option value="business">BusinessMan</option>
    </select>
  </p>
  <p>
    <label for="haircolor">Hair Color:</label>
    <select name="haircolor" id="haircolor">
      <option value="black">Black Color</option>
      <option value="gray">Gray Color</option>
      <option value="brown">Brown Color</option>
    </select>
  </p>
  <p>
    <label for="hobby">Hobbies:<br>
    </label>
    <select name="hobby" size="5" multiple id="hobby">
      <option value="Singing">Singing</option>
      <option value="Dancing">Dancing</option>
      <option value="Cricket">Cricket</option>
      <option value="Guitar">Guitar</option>
    </select>
  </p>
  <p>
    <label for="description">Description:<br>
    </label>
    <textarea name="description" cols="75" rows="10" id="description"></textarea>
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
  </p>
  <p>&nbsp;</p>
</form>
<p>&nbsp;</p>
</body>
</html>
