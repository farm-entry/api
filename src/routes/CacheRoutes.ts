import { Router } from "express";
import {
  clearAllCaches,
  clearSpecificCache,
  getCacheStats,
} from "../controllers/CacheController.js";

const router = Router();

router.get("/stats", getCacheStats);
router.delete("/", clearAllCaches);
router.delete("/:key", clearSpecificCache);

export default router;
