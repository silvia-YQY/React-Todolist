import * as AV from 'leancloud-storage'

const APP_ID = 'ir3TIhFQBxF8cAtld7O0PsHG-gzGzoHsz';
const APP_KEY = 'hxW1GTLXAanOHxwQrSYlJLwk';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV