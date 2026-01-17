const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// ADD TASK
router.post("/", authMiddleware, async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        priority: req.body.priority,
        user: req.user
    });
    const savedTask = await task.save();
    res.json(savedTask);
})

// FETCH TASK
router.get("/", authMiddleware, async (req,res) => {
    const task = await Task.find({user: req.user});
    res.json(task);
})

router.put("/:id", authMiddleware, async (req,res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user}, 
            {
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.deadline,
                priority: req.body.priority,
            },
            {new: true}
        )

        if(!updatedTask) {
            return res.status(404).json({message: "task not found"});
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
})

router.put("/markDone/:id", authMiddleware, async (req,res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user}, 
            {isCompleted: req.body.isCompleted},
            {new: true}
        )

        if(!updatedTask) {
            return res.status(404).json({message: "task not found"});
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
})

router.delete("/:id", authMiddleware, async (req,res) => {
    try {
        const deletedtask = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if(!deletedtask) {
            return res.status(404).json({message: "task not found"});
        };

        res.json(deletedtask);
    }catch (error) {
        res.status(500).json({message: "Server Error"});
    }
})

module.exports = router;
