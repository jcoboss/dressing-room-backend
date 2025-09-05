const supabase = require('../config/supabase');
const { validationResult } = require('express-validator');

// Signup new user
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, ...userData } = req.body;

    // Register user with Supabase Auth
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData // Store additional user data in auth.users metadata
      }
    });

    if (signUpError) throw signUpError;

    // Set session cookie if auto-confirm is enabled and session is available
    if (user.session) {
      res.cookie('sb-access-token', user.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.cookie('sb-refresh-token', user.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
    }

    res.status(201).json({
      message: "Registration successful. Please check your email for verification.",
      user: {
        id: user.id,
        email: user.email,
        ...userData
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Set session cookies
    res.cookie('sb-access-token', session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.cookie('sb-refresh-token', session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    // Get the session from the access token cookie
    const accessToken = req.cookies['sb-access-token'];
    
    if (accessToken) {
      // Sign out from Supabase with the current session
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: req.cookies['sb-refresh-token']
      });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }

    // Clear the session cookies
    res.clearCookie('sb-access-token');
    res.clearCookie('sb-refresh-token');

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const accessToken = req.cookies['sb-access-token'];
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get user with the session from cookie
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error) throw error;
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
