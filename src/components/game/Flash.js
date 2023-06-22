const Flash = ({ visible, found }) => {
  if (!visible) return;
  
  if (!found) return (
    <div className="flash incorrect">Try again!</div>
  )

  return (
    <div className="flash correct">You found {found}!</div>
  )
}

export default Flash;