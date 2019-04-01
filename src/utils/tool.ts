
import * as crypto from 'crypto';
import { WX_TOKEN } from './const';
export const checkToken = function(signature, timestamp, nonce) {
    const key = crypto.createHash('sha1').update([WX_TOKEN, timestamp, nonce].sort().join()).digest('hex').toUpperCase();
    if(key === signature) {
        return true;
    } else {
        return false;
    }
}