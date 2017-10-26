
import {http} from './common/http-base'

let check_code = o => http('org-fix_org_wechat_code_check', o)

let login =  o => http('fix_org_login', o)

let sendMsg =  o => http('fix_org_send_captcha', o)

let bindAcc =  o => http('fix_org_bind', o)

export {
  check_code,
  login,
  sendMsg,
  bindAcc
}