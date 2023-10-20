
const env = 'prod'

export const url = () => {
  switch (env) {
    case 'prod':
      return ''
    case 'test':
      return 'http://localhost:5099/api/'
    default: ///dev
      return ''
  }
}
