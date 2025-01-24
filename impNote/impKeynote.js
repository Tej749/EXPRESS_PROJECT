// Patch Method (Update JSON format data)

app.patch("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const { game, player, add } = req.body;
  await Blog.findByIdAndUpdate(id, {
    game: game,
    player: player,
    add: add,
  });
  res.status(200).json({
    msg: "Blog update successfully....",
  });
});
