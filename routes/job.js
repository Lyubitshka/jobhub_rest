const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyTokenAndAgent } = require("../middleware/verifyToken");

router.post('/', verifyTokenAndAgent, jobController.createJob);

// UPDATE 
router.put("/:id", verifyTokenAndAgent, jobController.updateJob);

// // DELETE 
router.delete("/:id", verifyTokenAndAgent, jobController.deleteJob);

// //GET JOB
router.get('/:id', jobController.getJob );

// //GET ALL JOBS
router.get('/', jobController.getAllJobs);

router.get('/search/:key', verifyTokenAndAgent, jobController.searchJobs);





module.exports = router;