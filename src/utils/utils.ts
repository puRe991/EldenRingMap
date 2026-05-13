/**
 * 工具类喵
 * @author wniko
 */
import axios from 'axios';
import md5 from 'md5';
import { setIp } from '../stores';
import { getCookie, setCookie } from './cookies';
import type { GetIPPositionReturn } from './typings';

/**
 * 获取IP和地址
 * @returns
 * @author wniko
 */
export const get_ip_position = (): GetIPPositionReturn => {
  // 判断是否可用，如果浏览去开启拦截广告，就不会读取，导致错误
  // @ts-ignore
  if (returnCitySN) {
    // @ts-ignore
    const value = returnCitySN; // 见index.html <script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>
    if (value) {
      return value as GetIPPositionReturn;
    }
  } else {
    return {
      cip: '',
      cid: '',
      cname: '',
    };
  }
};

/**
 * 设置用户ip
 */
export const set_client_ip = () => {
  axios.get('./ipRequest.php').then(res => {
    setIp(res?.data?.ip);
  });
};

export { getCookie, setCookie };

/**
 * 根据ip获取对应的匿名id
 * @param ip IP
 */
export const getMD5Id = (ip: string) => {
  return ip === 'unknown' || ip === '' ? '' : md5(ip).substring(0, 6);
};
