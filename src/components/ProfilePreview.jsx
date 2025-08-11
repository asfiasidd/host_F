import React from 'react';

const ProfilePreview = ({ profile }) => {
  if (!profile) return <p>No profile to display</p>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded mt-6">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p>
        <strong>Skills:</strong> {profile.skills.join(', ')}
      </p>
      <p>
        <strong>GitHub:</strong>{' '}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          {profile.github}
        </a>
      </p>
      <div>
        <h3 className="font-semibold mt-4">Projects:</h3>
        {profile.projects.map((p, i) => (
          <div key={i} className="border p-2 rounded mb-2">
            <h4 className="font-semibold">{p.title}</h4>
            <p>{p.description}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              {p.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
