/**
 * Created by zhongpingping on 2018/3/23.
 */
/**
 * Created by zhongpingping on 2018/3/20.
 */

let exec = require('child_process').exec

function getTimeString () {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() > 8 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  let day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  let hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
  let minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
  return year + '' + month + '' + day + '' + hours + '' + minutes
}

exports.generateTags = function () {
  exec('git tag | sort -t "_" -k 2 -r | head -1', function (error, stdout, stderr) {
    if (error) {
      console.log(JSON.stringify(error))
      process.exec()
    }

    console.log(' "git tag | sort -t "_" -k 2 -r | head -1"  execute finished ' + stdout)

    if (stdout) {
      let matches = stdout.match(/v(\d+\.\d+\.\d+)_\d+/) // 0.0.1.201803201610
      let splits = matches.length === 2 && matches[1] ? matches[1].split('.') : []
      if (splits.length === 3) {
        if (parseInt(splits[2], 10) >= 49) {
          splits[2] = 1
          splits[1] = +splits[1] + 1
        } else {
          splits[2] = +splits[2] + 1
        }

        if (parseInt(splits[1], 10) >= 49) {
          splits[1] = 1
          splits[0] = +splits[0] + 1
        }
      }

      console.log('generate a new tag: v' + splits.join('.') + '_' + getTimeString())
    } else {
      console.log('generate a new tag: v0.0.1_' + getTimeString())
    }
  })
}

exports.fetchTags = function () {
  exec('git pull --tags', function (error, stdout, stderr) {
    if (error) {
      console.log(JSON.stringify(error))
      process.exec()
    }

    console.log(' git pull --tags ' + stdout)
    console.log(' 如果您想继续自动生成新tag号，请输入yes')
  })
}
