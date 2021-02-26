import {Router} from 'express'

const router = Router();

router.get("/users", (req,res) =>{
    return res.send("Hello o/")
})

export { router }