const jwt = require('koa-jwt')

const secret =
  '#Y_HfuzXGZY_34Jp_5dPHEuxRQ%469%dX!LsDNMuJBu--7+NxffQuzjQTUR4-y8kM3kCjk?L6G-?HhU#ueb8wxeVjE4SFUcCQRQ?P7!ZJFwsL?Sk2WfxvjQpPkC9__q3j#Q@Es$@BF7zS#syMhuKb+RfT_eD@tA_!#LeVDgA#A_!Xy72pfzte!aC=&9^XKK+ZVXaZcZb#*Ju^QhyA*Bwrbf+Qj%&#vPuDjHdXTpgAhvqGetvgEW846ema^%e5XWP'
const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwbGF5ZXItMSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.fQM8qlMh1JO-OTHjwWmllKV8X2yJ0vgMl3G4HQpZuAg'
module.exports = {
  BearerAuth: jwt({ secret, passthrough: true }),
  sampleToken,
  secret,
}
