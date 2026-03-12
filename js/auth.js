// js/auth.js
import CONFIG from './config.js';

// Initialize Supabase once
const supabase = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);

export { supabase };

// Auth helper functions
export async function signUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin + '/dashboard.html'
            }
        });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
    }
}

export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/index.html';
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Update header based on auth state
export async function updateHeaderAuth() {
    const session = await getSession();
    
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const dashboardLink = document.getElementById('dashboard-link');
    
    if (!loginLink || !logoutLink || !dashboardLink) return;
    
    if (session) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        dashboardLink.style.display = 'inline';
    } else {
        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
        dashboardLink.style.display = 'none';
    }
}