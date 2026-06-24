function change_string(ele) {
  let idk = [
    '100% discount on all HTTP traffic!!!',
    'free IPv4 prefixes!',
    'FUCK YOU',
    'www.eff.org/nsa-spying/timeline',
    'click here to win a cisco ASA 5506-X',
    'you are visitor number -1',
    'HOT SINGLES in 100.64.0.0/10 want to PING you'
  ]
  let i = Math.floor(Math.random() * idk.length);
  let content = idk[i];

  ele.innerHTML = content;
}
