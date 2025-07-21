exports.reguser = (name, email, mobile) => {
  return `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>User Information</title>
  <style>
    /* Container styling */
    .container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Header styling */
    .heading {
      color: #333;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 2px solid #4CAF50;
    }

    /* User info section */
    .info {
      font-size: 16px;
      color: #444;
      line-height: 1.6;
    }

    /* Label styling */
    .label {
      display: inline-block;
      font-weight: bold;
      color: #4CAF50;
      width: 100px;
    }

    /* Individual information items */
    .info-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    /* Last item without border */
    .info-item:last-child {
      border-bottom: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="heading">New User Registration Successful on SGSRO</div>
    <div class="info">
      <div class="info-item">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="info-item">
        <span class="label">Email:</span> ${email}
      </div>
      <div class="info-item">
        <span class="label">Mobile:</span> ${mobile}
      </div>
    </div>
  </div>
</body>

</html>`;
}