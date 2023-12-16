const db = require('../database/database');
const { createComment, displayUpdateForm, updateComment, deleteComment } = require('../services/commentService');

describe('commentService Tests', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = await db();
  });

  beforeEach(async () => {
    await sequelize.models.Comment.destroy({ where: {} });
    await sequelize.models.Comment.bulkCreate([
      { title: 'Test Comment 1' },
      { title: 'Test Comment 2' },
    ]);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('createComment should create a new comment in the database', async () => {
    const req = {
      body: { title: 'New Test Comment' },
    };
    const res = { redirect: jest.fn() };
    const next = jest.fn();
    await createComment(req, res, next);

    // Check if the comment was created in the database
    const createdComment = await sequelize.models.Comment.findOne({
      where: { title: 'New Test Comment' },
    });
    expect(createdComment).not.toBeNull();
    // You may add more specific expectations based on your actual data
  });

  it('displayUpdateForm should render the update form for a specific comment', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = { render: jest.fn() };
    const next = jest.fn();
    await displayUpdateForm(req, res, next);

    // Ensure that the render function was called with the correct data
    expect(res.render).toHaveBeenCalledWith('formupdate.twig', {
      title: 'Update form',
      comment: expect.any(Object),
    });
    // You may add more specific expectations based on your actual data
  });

  it('updateComment should update a specific comment in the database', async () => {
    const req = {
      body: { title: 'Updated Test Comment' },
      params: { id: 1 },
    };
    const res = { redirect: jest.fn() };
    const next = jest.fn();
    await updateComment(req, res, next);

    // Check if the comment was updated in the database
    const updatedComment = await sequelize.models.Comment.findByPk(1);
    expect(updatedComment.title).toBe('Updated Test Comment');
    // You may add more specific expectations based on your actual data
  });

  it('deleteComment should delete a specific comment from the database', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = { redirect: jest.fn() };
    const next = jest.fn();
    await deleteComment(req, res, next);

    // Check if the comment was deleted from the database
    const deletedComment = await sequelize.models.Comment.findByPk(1);
    expect(deletedComment).toBeNull();
    // You may add more specific expectations based on your actual data
  });
});