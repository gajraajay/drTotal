const sendSuccess = (req, res, resData, headers) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(resData);
}
const sendError=(req,res,resData,headers)=>{
    res.setHeader('Content-Type', 'application/json');
    res.json(resData);
}
// module.exports = MyClass;

module.exports = {
  sendSuccess,sendError
}