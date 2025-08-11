import React, { useState, useEffect } from 'react';
import { getProfile, saveProfile } from '../services/api';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    skills: '',
    github: '',
    projects: [{ title: '', description: '', link: '' }],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res.data) {
          setProfile({
            ...res.data,
            skills: res.data.skills.join(', '),
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...profile.projects];
    newProjects[index][field] = value;
    setProfile({ ...profile, projects: newProjects });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { title: '', description: '', link: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await saveProfile({
        ...profile,
        skills: profile.skills.split(',').map((s) => s.trim()),
      });
      setMessage('Profile saved successfully!');
    } catch (err) {
      setMessage('Failed to save profile.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={profile.github}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="font-semibold">Projects</label>
          {profile.projects.map((proj, i) => (
            <div key={i} className="mb-2 border p-2 rounded">
              <input
                type="text"
                placeholder="Title"
                value={proj.title}
                onChange={(e) =>
                  handleProjectChange(i, 'title', e.target.value)
                }
                className="w-full p-1 border rounded mb-1"
              />
              <textarea
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  handleProjectChange(i, 'description', e.target.value)
                }
                className="w-full p-1 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Link"
                value={proj.link}
                onChange={(e) =>
                  handleProjectChange(i, 'link', e.target.value)
                }
                className="w-full p-1 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="mt-2 text-blue-600"
          >
            Add Project
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
