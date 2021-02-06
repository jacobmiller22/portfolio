const AWS = require("aws-sdk");

export default (req, res) => {
  /**
   * Recieve a JSON object with fields -> firstName, lastName, company, message
   *
   * Timestamp message, store in dynamodb db
   *
   */

  var { firstName, lastName, company, message } = req.body;

  if (!firstName || !lastName || !message) {
    res.json({
      code: 400,
      error: "Bad request",
    });
  }

  AWS.config.loadFromPath("./src/config/aws.json");

  var ddb = new AWS.DynamoDB();

  var params = {
    TableName: "Messages",
    Item: {
      firstName: { S: firstName },
      lastName: { S: lastName },
      company: { S: company },
      message: { S: message },
      dateSent: { N: `${Date.now()}` },
    },
  };

  try {
    var res = await ddb.putItem(params).promise();
  } catch(err) {
    console.log("Error: ", err);
  }

  res.status(200).json({ success: res ? true : false });
};