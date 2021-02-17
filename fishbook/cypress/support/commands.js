import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import * as firebaseConf from "../../src/environments/firebase-config-cypress";
import * as cypressConfig from "../../cypress.json";

firebase.initializeApp(firebaseConf.firebaseConfig);
const equipmentName = "testEquipment";
const initialMyProfileData = {
  firstName: cypressConfig.testUser.firstName,
  lastName: cypressConfig.testUser.lastName,
  aboutMe: cypressConfig.testUser.aboutMe,
};

const initialEquipment = {
  rod: cypressConfig.testUser.equipments[0].rod,
  line: cypressConfig.testUser.equipments[0].line,
  reel: cypressConfig.testUser.equipments[0].reel,
  name: cypressConfig.testUser.equipments[0].name,
};

Cypress.Commands.add("login", (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
});

Cypress.Commands.add("seed", () => {
  const db = firebase.firestore();
  const userDoc = db.collection("users").doc(cypressConfig.testUser.uid);

  const myProfilePromise = userDoc.set(initialMyProfileData);

  const equipmentPromise = userDoc
    .collection("equipments")
    .doc(equipmentName)
    .set(initialEquipment);

  return Promise.all([myProfilePromise, equipmentPromise]);
});

Cypress.Commands.add("cleanup", () => {
  const db = firebase.firestore();
  const deleteUserPromise = deleteNewlyCreatedUsers(db);
  const deleteEquipmentPromise = deleteNewlyCreatedEequipments(db);
  const myProfilePromise = setDefaultMyProfileState(db);
  const equipmentPromise = setDefaultEquipmentState(db);

  return Promise.all([
    deleteUserPromise,
    myProfilePromise,
    deleteEquipmentPromise,
    equipmentPromise,
  ]);
});

function deleteNewlyCreatedUsers(db) {
  db.collection("users")
    .where(
      firebase.firestore.FieldPath.documentId(),
      "!=",
      cypressConfig.testUser.uid
    )
    .get()
    .then((userDocumentsToDelete) => {
      return new Cypress.Promise((resolve) => {
        let batchDelete = db.batch();
        userDocumentsToDelete.forEach((doc) => {
          batchDelete.delete(doc.ref);
        });

        resolve(batchDelete.commit());
      });
    });
}

function deleteNewlyCreatedEequipments(db) {
  db.collection("users")
    .doc(cypressConfig.testUser.uid)
    .collection("equipments")
    .where(firebase.firestore.FieldPath.documentId(), "!=", equipmentName)
    .get()
    .then((equipmentsToDelete) => {
      return new Cypress.Promise((resolve) => {
        let batchDelete = db.batch();
        equipmentsToDelete.forEach((doc) => {
          batchDelete.delete(doc.ref);
        });

        resolve(batchDelete.commit());
      });
    });
}

function setDefaultMyProfileState(db) {
  return db
    .collection("users")
    .doc(cypressConfig.testUser.uid)
    .set(initialMyProfileData);
}

function setDefaultEquipmentState(db) {
  return db
    .collection("users")
    .doc(cypressConfig.testUser.uid)
    .collection("equipments")
    .doc(equipmentName)
    .set(initialEquipment);
}
