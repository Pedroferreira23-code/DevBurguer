import { Router } from "express";

const routes = new Router();

routes.get("/", (require, response) => {
	return response.status(200).json({ menssage: "hellow word!" });
});

export default routes;
