const Job = require('../models/Job');

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);
        try {
            const savedJob = await newJob.save();

            const { __v, createdAt, updatedAt, ...newJobData } = savedJob._doc;

            res.status(200).json(newJobData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true });

            const { password, __v, createdAt, ...job } = updatedJob._doc;
            res.status(200).json({ ...job });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id);
            res.status(200).json("Job Successfully Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            const { __v, createdAt, ...jobData } = job._doc;
            res.status(200).json({ ...jobData });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllJobs: async (req, res) => {
        const recent = req.query.new;
        try {
            let jobs;
            if (recent) {
                jobs = await Job.find().sort({ createdAt: -1 }).limit(2);
            } else {
                jobs = await Job.find();
            }
            res.status(200).json(jobs);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    ,
    searchJobs: async (req, res) => {
        try {
            const result = await Job.aggregate(
                [
                    {
                        $search: {
                            index: "jobsearch",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            );
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }


}