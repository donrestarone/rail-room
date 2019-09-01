export const changeClassesOfRefs = (refList, turnDark) => {
  if (turnDark) {
    refList.forEach(ref => {
      let existingClassName = ref.className
      ref.className = ''
      // get the existing classname. add "-dark" to it and then clear the old one, for toggling back we do the opposite by removing "-dark"
      ref.classList.add(`${existingClassName}-dark`)
    })
  } else {
    refList.forEach(ref => {
      let existingClassName = ref.className
      ref.className = ''
      // get the existing classname. add "-dark" to it and then clear the old one, for toggling back we do the opposite by removing "-dark"
      ref.classList.add(`${existingClassName.replace('-dark', '')}`)
    })
  }
}