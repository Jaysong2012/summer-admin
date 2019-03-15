const req = require.context('../../icons/svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys()
console.log(requireAll)

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default icons
