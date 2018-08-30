module.exports = {
  fold: () => 'FOLD',
  call: () => 'CALL',
  bet: x => {
    if(!x) return 'BET';

    return `BET:${x}`
  }
}