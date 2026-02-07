import { useConnect, useConnectors } from 'wagmi'
import { useState } from 'react'

function Login() {
  const { connect, error } = useConnect()
  const connectors = useConnectors()
  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredImage, setHoveredImage] = useState(false)

  return (
    <div className='container-fluid px-4 py-5' style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B2C 0%, #FF9500 100%)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div className='row flex-lg-row-reverse align-items-center g-5 py-5' style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Coluna da imagem */}
        <div className='col-md-6'>
          <div 
            onMouseEnter={() => setHoveredImage(true)}
            onMouseLeave={() => setHoveredImage(false)}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: hoveredImage ? '0 30px 80px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.3)',
              transform: hoveredImage ? 'rotate(0deg) scale(1.05)' : 'rotate(-2deg) scale(1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src="https://s2-g1.glbimg.com/oQkh9RvVno32h68-r06gXaPoskI=/0x0:984x554/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/q/Q/pAo4MYTy2WU6K4pqNpTw/bbb.jpeg"
              className='d-block img-fluid'
              alt="Mascote do BBB"
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,107,44,0.2), rgba(255,149,0,0.2))',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Coluna do conteúdo */}
        <div className='col-md-6'>
          <h1 className='display-5 fw-bold lh-1 mb-3' style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Webbb3
          </h1>
          
          <p className='lead mb-3' style={{
            fontSize: '1.5rem',
            color: 'rgba(255,255,255,0.95)',
            fontWeight: '600'
          }}>
            Votação on-chain do BBB
          </p>
          
          <p className='lead mb-4' style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.6'
          }}>
            Autentique-se com sua carteira e deixe o seu voto para o próximo paredão.
          </p>

          <div className='d-grid gap-2 d-md-flex'>
            <button
              type='button'
              onClick={() => connect({ connector: connectors[0] })}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              className='btn btn-lg px-4'
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: 'none',
                borderRadius: '16px',
                padding: '1.25rem 2rem',
                fontSize: '1.15rem',
                fontWeight: '700',
                color: '#FF6B2C',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: hoveredButton ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)',
                transform: hoveredButton ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1280px-MetaMask_Fox.svg.png?20220831120339"
                width="48"
                height="48"
                alt="MetaMask Logo"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
              <span>Conectar com a MetaMask</span>
            </button>
          </div>

          {error && (
            <p className='message mt-3' style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              color: '#fff',
              fontSize: '1rem',
              animation: 'shake 0.5s ease-out'
            }}>
              ⚠️ {error.message}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  )
}

export default Login