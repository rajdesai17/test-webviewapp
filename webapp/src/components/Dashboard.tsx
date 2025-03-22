import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Profile } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Welcome, {profile?.full_name || 'User'}!</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 text-sm text-gray-900">{profile?.full_name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 text-sm text-gray-900">{user?.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Created</label>
                <div className="mt-1 text-sm text-gray-900">
                  {new Date(profile?.created_at || '').toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}