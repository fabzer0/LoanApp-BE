const sessionizeUser = user => {
  return { userId: user.id, email: user.email, googleId: user.googleId, publish: user.publish, write: user.write, read: user.read, type: "internal" };
};

const sessionizeClient = user => {
  return { userId: user.id, email: user.email, isActive: user.isActive, type: "external" }
}

const sessionizeAuthClient = user => {
  return { userId: user.id, email: user.email, authId: user.authId, type: "external" }
}

const quickbooksTokenData = data => {
  return {
    userId: data.customerId,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    realmId: data.realmId
  };
};

const checkReadPermit = (req, res, next) => {
  if (req.user) {
    if (!req.user.read) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized'
      })
    }
    const { 
      user: { read }
    } = req;
    if (read) {
      return next()
    }
    return res.status(401).json({
      success: false,
      message: 'You are not authorized'
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized'
    })
  }
}

module.exports = {
  sessionizeUser,
  sessionizeClient,
  sessionizeAuthClient,
  quickbooksTokenData,
  checkReadPermit
};
