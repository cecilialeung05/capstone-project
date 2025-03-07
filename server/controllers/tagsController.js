import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getTags = async (req, res) => {
  try {
    const tags = await knex("tags")
      .select('*')
      .orderBy('name');

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error getting tags:", error);
    res.status(500).json({ message: "Error retrieving tags", error: error.message });
  }
};

export const getTag = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await knex("tags")
      .where({ id })
      .first();

    if (!tag) {
      return res.status(404).json({ message: `Tag with ID ${id} not found` });
    }

    const tasks = await knex("tasks")
      .select("tasks.*")
      .join("task_tags", "tasks.id", "task_tags.task_id")
      .where("task_tags.tag_id", id);

    const notes = await knex("notes")
      .select("notes.*")
      .join("note_tags", "notes.id", "note_tags.note_id")
      .where("note_tags.tag_id", id);

    res.status(200).json({
      ...tag,
      tasks,
      notes
    });
  } catch (error) {
    console.error("Error getting tag:", error);
    res.status(500).json({ message: "Error retrieving tag", error: error.message });
  }
};

export const addTag = async (req, res) => {
  const { name } = req.body;

  try {
    const [id] = await knex("tags").insert({ name });
    const newTag = await knex("tags").where({ id }).first();
    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ message: "Error creating tag", error: error.message });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await knex("tags").where({ id }).update({ name });
    const updatedTag = await knex("tags").where({ id }).first();
    res.status(200).json(updatedTag);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ message: "Error updating tag", error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    await knex.transaction(async (trx) => {
      await trx("task_tags").where({ tag_id: id }).del();
      await trx("note_tags").where({ tag_id: id }).del();
      await trx("tags").where({ id }).del();
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ message: "Error deleting tag", error: error.message });
  }
};