const { db } = require("../firebaseConfig");

exports.sync = async (req, res, next) => {
  const { name, email, picture, uid } = req.user;

  const userRef = db.collection("users").doc(uid);

  try {
    const userData = await db.runTransaction(async (t) => {
      const doc = await t.get(userRef);

      if (!doc.exists) {
        const newUserData = {
          email: email || "",
          name: name || "",
          profilePictureUrl: picture || "",
          createdAt: new Date().toISOString(),
          interviewsTaken: 0,
        };
        t.set(userRef, newUserData);

        return newUserData;
      } else {
        //User already exits
        return doc.data();
      }
    });

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ message: "Error syncing user data" });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const docRef = db.collection("users").doc(req.user.uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: "User profile not found in database" });
    }
    const userData = doc.data();

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getMe handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
