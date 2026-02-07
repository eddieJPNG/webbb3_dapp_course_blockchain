import { useEffect, useState } from 'react';
import { useConfig }  from 'wagmi';
import { readContract, writeContract } from '@wagmi/core';
import ABI from './ABI.json';

type Voting = {
    option1: string;
    option2: string;
    votes1: number;
    votes2: number;
    maxDate: number;
}

export default function Vote() {
    const CONTRACT_ADDRESS = '0xD07df20Cce5aa01F1e331F213Ae2711d4bb5Ab62';
    const config = useConfig();
    const [message, setMessage] = useState<string>("");
    const [voting, setVoting] = useState<Voting>({ maxDate: 0, option1: "", option2: "", votes1: 0, votes2: 0 });
    const [showVotes, setShowVotes] = useState<number>(0);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            chainId: config.chains[0].id,
            functionName: 'getCurrentVoting',
            args: [],
        })
        .then(result => {
            console.log("Current voting", result);
            const voting = result as Voting;
            setVoting(voting);
        })
        .catch(err => {
            console.error(err);
            setMessage(err.message);
        })
    }, [])

    function isExpired(): boolean {
        return Number(voting.maxDate) < Date.now() / 1000;
    }

    function getMaxDate(): string {
        return new Date(Number(voting.maxDate) * 1000).toLocaleString('pt-BR');
    }

    function getImgUrl(name) {
        switch(name) {
            case 'Edson':
                return 'https://media.licdn.com/dms/image/v2/D4E03AQHB1trDieeRsQ/profile-displayphoto-scale_200_200/B4EZjraNkQGoAY-/0/1756296175886?e=1772064000&v=beta&t=lvrBXy0noAg3e72pgDGVFbK0ykX5y32UcOiIyYDteq4'
            case 'Kauany':
                return 'https://portalpopline.com.br/wp-content/uploads/2021/01/BBB-mascote.jpg'
            default: return 'https://media1.tenor.com/m/tiqLQR7XgBEAAAAC/adachi-persona-4.gif'
        }
    }

    function btnVote2Click() {
        setMessage("Conectando Carteira...Aguarde...");
        doVote(2);
    }

    function btnVote1Click() {
        setMessage("Conectando Carteira...Aguarde...");
        doVote(1);
    }

    function getVoteCount(option: number): number {
        if (option === 1)
            return showVotes === option ? Number(voting.votes1) + 1 : Number(voting.votes1);
        else
            return showVotes === option ? Number(voting.votes2) + 1 : Number(voting.votes2);    
    }

    function getVotePercentage(option: number): number {
        const total = Number(voting.votes1) + Number(voting.votes2);
        if (total === 0) return 0;
        const votes = option === 1 ? Number(voting.votes1) : Number(voting.votes2);
        return Math.round((votes / total) * 100);
    }

    function doVote(choice: number) {
        writeContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            chainId: config.chains[0].id,
            functionName: 'addVote',
            args: [choice],
        })
        .then(result => {
            setShowVotes(choice);
            setMessage("Voto computado com sucesso! Resultado parciais estão sujeitos a alterações minuto a minuto!");
        })
        .catch(err => {
            console.error(err);
            setMessage(err.message);
        })
    }

    return (
        <div className='container px-4 py-5' style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FF6B2C 0%, #FF9500 100%)',
            maxWidth: '100%',
            margin: 0
        }}>
            <div className='row align-items-center' style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem'
            }}>
                <h1 className='display-5 fw-bold lh-1 mb-3' style={{
                    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    letterSpacing: '-0.02em'
                }}>
                    Webbb3
                </h1>
                <p className='lead' style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    Votação on-chain do BBB
                </p>
                {isExpired() ? (
                    <p className='lead' style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        padding: '1rem 2rem',
                        display: 'inline-block',
                        margin: '1rem auto'
                    }}>
                        🔒 A votação encerrou. Confira abaixo os resultados!
                    </p>
                ) : (
                    <p className='lead' style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        padding: '1rem 2rem',
                        display: 'inline-block',
                        margin: '1rem auto'
                    }}>
                        ⏰ Você tem até <strong>{getMaxDate()}</strong> para votar!
                    </p>
                )}
            </div>

            <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
                <div className='col-1'></div>
                
                {/* Card Participante 2 */}
                <div className='col-5'>
                    <div 
                        onMouseEnter={() => setHoveredCard(2)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${hoveredCard === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
                            borderRadius: '24px',
                            padding: '2rem',
                            transform: hoveredCard === 2 ? 'translateY(-8px)' : 'translateY(0)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: hoveredCard === 2 ? '0 20px 60px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <h3 className='my-2 d-block mx-auto text-center' style={{
                            color: '#fff',
                            fontSize: '1.75rem',
                            fontWeight: '700'
                        }}>
                            {voting.option2}
                        </h3>
                        
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <img 
                                src={getImgUrl(voting.option2)} 
                                alt="Participante 2" 
                                className='d-block mx-auto img-fluid rounded' 
                                width={250} 
                                height={250}
                                style={{
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease',
                                    transform: hoveredCard === 2 ? 'scale(1.05)' : 'scale(1)',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover'
                                }}
                            />
                            {(showVotes > 0 || isExpired()) && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '250px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    padding: '2rem 1rem 1rem',
                                    color: '#fff',
                                    borderRadius: '0 0 16px 16px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>
                                        {getVotePercentage(2)}%
                                    </div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                        {getVoteCount(2)} votos
                                    </div>
                                </div>
                            )}
                        </div>

                        {(showVotes > 0 || isExpired()) && (
                            <div style={{
                                height: '8px',
                                background: 'rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                width: '250px',
                                margin: '0 auto 1rem'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${getVotePercentage(2)}%`,
                                    background: 'linear-gradient(90deg, #FF6B2C, #FF9500)',
                                    transition: 'width 1s ease-out',
                                    borderRadius: '4px'
                                }} />
                            </div>
                        )}

                        {isExpired() || showVotes > 0 ? (
                            <button 
                                className='btn btn-secondary p-3 my-2 d-block mx-auto' 
                                style={{ 
                                    width: 250,
                                    background: 'rgba(255,255,255,0.3)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600'
                                }} 
                                disabled={true}
                            >
                                {getVoteCount(2)} votos
                            </button>
                        ) : (
                            <button 
                                className='btn btn-primary p-3 my-2 d-block mx-auto' 
                                style={{ 
                                    width: 250,
                                    background: 'linear-gradient(135deg, #FF6B2C 0%, #FF9500 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    transform: hoveredCard === 2 ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: hoveredCard === 2 ? '0 8px 24px rgba(0,0,0,0.3)' : 'none'
                                }} 
                                onClick={btnVote2Click}
                            >
                                🔥 Quero que este saia
                            </button>
                        )}
                    </div>
                </div>

                {/* Card Participante 1 */}
                <div className='col-5'>
                    <div 
                        onMouseEnter={() => setHoveredCard(1)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${hoveredCard === 1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
                            borderRadius: '24px',
                            padding: '2rem',
                            transform: hoveredCard === 1 ? 'translateY(-8px)' : 'translateY(0)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: hoveredCard === 1 ? '0 20px 60px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <h3 className='my-2 d-block mx-auto text-center' style={{
                            color: '#fff',
                            fontSize: '1.75rem',
                            fontWeight: '700'
                        }}>
                            {voting.option1}
                        </h3>
                        
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <img 
                                src={getImgUrl(voting.option1)} 
                                alt="Participante 1" 
                                className='d-block mx-auto img-fluid rounded' 
                                width={250} 
                                height={250}
                                style={{
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease',
                                    transform: hoveredCard === 1 ? 'scale(1.05)' : 'scale(1)',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover'
                                }}
                            />
                            {(showVotes > 0 || isExpired()) && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '250px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    padding: '2rem 1rem 1rem',
                                    color: '#fff',
                                    borderRadius: '0 0 16px 16px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>
                                        {getVotePercentage(1)}%
                                    </div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                        {getVoteCount(1)} votos
                                    </div>
                                </div>
                            )}
                        </div>

                        {(showVotes > 0 || isExpired()) && (
                            <div style={{
                                height: '8px',
                                background: 'rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                width: '250px',
                                margin: '0 auto 1rem'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${getVotePercentage(1)}%`,
                                    background: 'linear-gradient(90deg, #FF6B2C, #FF9500)',
                                    transition: 'width 1s ease-out',
                                    borderRadius: '4px'
                                }} />
                            </div>
                        )}

                        {isExpired() || showVotes > 0 ? (
                            <button 
                                className='btn btn-secondary p-3 my-2 d-block mx-auto' 
                                style={{ 
                                    width: 250,
                                    background: 'rgba(255,255,255,0.3)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600'
                                }} 
                                disabled={true}
                            >
                                {getVoteCount(1)} votos
                            </button>
                        ) : (
                            <button 
                                className='btn btn-primary p-3 my-2 d-block mx-auto' 
                                style={{ 
                                    width: 250,
                                    background: 'linear-gradient(135deg, #FF6B2C 0%, #FF9500 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    transform: hoveredCard === 1 ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: hoveredCard === 1 ? '0 8px 24px rgba(0,0,0,0.3)' : 'none'
                                }} 
                                onClick={btnVote1Click}
                            >
                                🔥 Quero que este saia
                            </button>
                        )}
                    </div>
                </div>
                
                <div className='col-1'></div>
            </div>

            {message && (
                <div className='row align-items-center'>
                    <p className='message text-center' style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        color: '#fff',
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {message}
                    </p>
                </div>
            )}
        </div>
    )
}