


export function onError(res) {
  return (err) => {
    console.error("ERROR: ", err)
    res.status(500).send({message: 'Internal server error!'});
  }
}
