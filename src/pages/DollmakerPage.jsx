import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { supabase } from '../client'
import { saveOtterAvatarToSupabase } from '../supabase-avatar-upload'
import { useLogin } from '../hooks/useLogin'
import '../App.css'

const DollmakerPage = () => {
  const { user, loading } = useLogin()
  const navigate = useNavigate()
  const otterContainerRef = useRef(null)
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedAccessories, setSelectedAccessories] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const colors = ['blue', 'brown', 'green', 'pink']
  const accessories = [
    { id: 'hat', label: 'Hat', image: '/accessories/hat.png' },
    { id: 'bowtie', label: 'Bow Tie', image: '/accessories/bowtie.png' },
    { id: 'glasses', label: 'Glasses', image: '/accessories/glasses.png' },
  ]

  const toggleAccessory = (accessoryId) => {
    setSelectedAccessories(prev => ({
      ...prev,
      [accessoryId]: !prev[accessoryId]
    }))
  }

  const handleSaveAsAvatar = async () => {
    if (!user) {
      setSaveMessage('You must be logged in to save your otter.')
      return
    }

    try {
      setIsSaving(true)
      setSaveMessage('Generating image...')

      // Capture the otter container as a canvas
      const canvas = await html2canvas(otterContainerRef.current, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
        scale: 2,
      })

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        try {
          setSaveMessage('Uploading to profile...')
          
          const result = await saveOtterAvatarToSupabase({
            supabase,
            userId: user.id,
            pngBlob: blob,
          })

          setSaveMessage('Success! Your otter has been saved as your profile picture.')
          
          // Refresh user data by navigating
          setTimeout(() => {
            navigate('/profile')
          }, 1500)
        } catch (error) {
          console.error('Error saving avatar:', error)
          setSaveMessage(`Error: ${error.message}`)
        } finally {
          setIsSaving(false)
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error capturing otter:', error)
      setSaveMessage(`Error: ${error.message}`)
      setIsSaving(false)
    }
  }

  if (loading) {
    return <div className='page-section'><p>Loading...</p></div>
  }

  if (!user && supabase) {
    return (
      <section className='page-section'>
        <div className='empty-state'>
          <h1>Create Your Otter Avatar</h1>
          <p>You must be logged in to create and save an otter avatar.</p>
          <div className='profile-actions'>
            <button onClick={() => navigate('/login')} className='primary-action'>Go to login</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='page-section' style={{ color: '#edf7f3' }}>
      <h1>Otter Dollmaker</h1>
      <p>Create your custom otter and save it as your profile picture!</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        {/* Otter Preview */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Your Otter</h2>
          <div
            ref={otterContainerRef}
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              margin: '0 auto',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              border: '2px solid #ddd',
              overflow: 'hidden',
            }}
          >
            {/* Base otter with selected color */}
            <img
              src={`/otterprofile-${selectedColor}.png`}
              alt="otter-base"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            />

            {/* Accessories layer */}
            {selectedAccessories.hat && (
              <img
                src="/accessories/hat.png"
                alt="hat"
                style={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  top: '-1%',
                  left: '10%',
                  pointerEvents: 'none',
                }}
              />
            )}
            {selectedAccessories.bowtie && (
              <img
                src="/accessories/bowtie.png"
                alt="bowtie"
                style={{
                  position: 'absolute',
                  width: '60%',
                  height: '60%',
                  top: '26%',
                  left: '21%',
                  pointerEvents: 'none',
                }}
              />
            )}
            {selectedAccessories.glasses && (
              <img
                src="/accessories/glasses.png"
                alt="glasses"
                style={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  top: '9%',
                  left: '11%',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div>
            <h3>Otter Color</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {colors.map(color => (
                <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span style={{ textTransform: 'capitalize' }}>{color}</span>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1px solid #999',
                      backgroundColor: 
                        color === 'blue' ? '#4a90e2' :
                        color === 'brown' ? '#8b6f47' :
                        color === 'green' ? '#7cb342' :
                        color === 'pink' ? '#e88fb3' : '#ccc'
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Accessories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {accessories.map(accessory => (
                <label key={accessory.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedAccessories[accessory.id] || false}
                    onChange={() => toggleAccessory(accessory.id)}
                  />
                  <span>{accessory.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button
              onClick={handleSaveAsAvatar}
              disabled={isSaving}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: isSaving ? '#ccc' : '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {isSaving ? 'Saving...' : 'Save as Profile Picture'}
            </button>
            {saveMessage && (
              <p style={{
                marginTop: '12px',
                padding: '10px',
                backgroundColor: saveMessage.includes('Success') ? '#e8f5e9' : '#fff3e0',
                color: saveMessage.includes('Success') ? '#2e7d32' : '#e65100',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                {saveMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DollmakerPage
