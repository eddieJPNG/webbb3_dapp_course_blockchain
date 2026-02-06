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

    useEffect(
        () => {
            readContract(config,{
                address: CONTRACT_ADDRESS,
                abi: ABI,
                chainId: config.chains[0].id,
                functionName:'getCurrentVoting',
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
        }, []
    )

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

    function doVote(choice: number) {
        writeContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            chainId: config.chains[0].id,
            functionName:'addVote',
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
    <div className='container px-4 py-5'>
        <div className='row align-items-center'>
            <h1 className='display-5 fw-bold text-body-emphasis lh-1 mb-3'>Webbb3</h1>
            <p className='lead'>Votação on-chain do BBB.</p>
            {

            isExpired() 
            ? <p className='lead'>A votação encerrou. Confira abaixo os resultados!</p>
            : <p className='lead'>Você tem até {getMaxDate()} para votar no participante que irá deixar o programa!</p>
            
            }
          </div>
      <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
        <div className='col-1'></div>
        <div className='col-5'>
          <h3 className='my-2 d-block mx-auto' style={{width: 250}}>{voting.option2}</h3>
          <img src={getImgUrl(voting.option2)} alt="Participante 2" className='d-block mx-auto img-fluid rounded' width={250} height={250}/>
          {
            isExpired() || showVotes > 0
                ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={ {width: 250}} disabled={true}>{getVoteCount(2)}</button>
                : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={ {width: 250} } onClick={btnVote2Click}>Quero que este saia</button>
          }
        </div>
        <div className='col-5'>
        <h3 className='my-2 d-block mx-auto' style={{width: 250}}>{voting.option1}</h3>
          <img src={getImgUrl(voting.option1)} alt="Participante 1" className='d-block mx-auto img-fluid rounded' width={250} height={250}/>
          {
            isExpired() || showVotes > 0
                ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={ {width: 250}} disabled={true}>{getVoteCount(1)}</button>
                : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={ {width: 250} } onClick={btnVote1Click}>Quero que este saia</button>
          }
        </div>
        <div className='col-1'></div>
      </div>
      <div className='row alignitems-center'>
        <p className='message'>{message}</p>
      </div>
    </div>
  )
} 

