import path from "path";

// what is an API?
// what is a REST API?
// what is express?
import express, { Express } from "express";
import cors from "cors";
import { Newbie } from "../db-types";
import { db } from "./firebase";
// import morgan?

const app: Express = express();
const port = 8080;

const newbieCollection = db.collection("newbies");

// what's cors?
app.use(cors());

// what does express.json do?
app.use(express.json());

//
app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.[HTTP method]([route path], [callback])
// gets all newbies in database
app.get("/allNewbies", async (req, res) => {
  try {
    const newbieDocs = await newbieCollection.get();
    const newbies: Newbie[] = newbieDocs.docs.map(
      (doc: any) => doc.data() as Newbie,
    );
    res.status(200).send(newbies);
  } catch (err) {
    res.status(500).send(err);
  }
});

// gets specific newbie by netId
app.get("/newbie", async (req, res) => {
  try {
    const { netId } = req.body;
    const doc = await newbieCollection.doc(netId).get();
    console.log(netId);
    if (!doc.exists) {
      throw new Error("Invalid id");
    }

    console.log(typeof doc);
    const newb = doc.data();
    res.status(200).send(newb);
  } catch (err) {
    res.status(500).send(err);
  }
});

// gets newbie by netid
app.get("/newbie/:netId", async (req, res) => {
  try {
    const { netId } = req.params;

    const doc = await newbieCollection.doc(netId).get();
    if (!doc.exists) {
      throw new Error("Invalid id");
    }

    const newb = doc.data();
    res.status(200).send(newb);
  } catch (err) {
    res.status(500).send(err);
  }
});

// creates a new newbie
app.post("/newNewbie", async (req, res) => {
  try {
    console.log(req.body);
    const netId: string = req.body["netId"];
    const newbie: Newbie = req.body["newbie"];

    if (netId === undefined || newbie === undefined) {
      throw new Error("Missing fields");
    }

    const doc = newbieCollection.doc(netId);
    doc.set(newbie);
    res.status(201).send(doc.id);
  } catch (err) {
    res.status(400).send(err);
  }
});

// updates newbie information
app.put("/updateNewbie/:netId", async (req, res) => {
  try {
    const { netId } = req.params;
    const newNewbie = req.body as Newbie;

    if (netId === undefined || newNewbie === undefined) {
      throw new Error("Missing fields");
    }

    const doc = newbieCollection.doc(netId);
    // if doc doesn't exist with id, updates nothing, return nothing
    doc.update(newNewbie);
    res.status(200).send(doc.id);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/newbies/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const newbieDocs = (await newbieCollection.where("year", "==", year).get())
      .docs;

    if (newbieDocs.empty || newbieDocs === undefined) {
      res.status(200).send("No matching documents");
    }
    const newbies: Newbie[] = newbieDocs.map(
      (doc: any) => doc.data() as Newbie,
    );
    console.log(newbies);
    res.status(200).send(newbies);
  } catch (err) {
    res.status(400).send(err);
  }
});

// deletes newbie
app.delete("/newbies/:netId", async (req, res) => {
  try {
    const { netId } = req.params;
    console.log(netId);

    // if doc doesn't exist, deletes nothing still works
    const doc = newbieCollection.doc(netId);
    doc.delete();
    res.status(200).send(netId);
  } catch (err) {
    res.status(400).send(err);
  }
});
