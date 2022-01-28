import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, {useState} from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

export async function getServerSideProps() {
    const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;

    return {
        props:{
            SUPABASE_ANON_KEY,
            SUPABASE_URL
        },
    };
};


export default function ChatPage({SUPABASE_URL, SUPABASE_ANON_KEY}) {
    /* Sua lógica vai aqui
        USUARIO:
        - usuario digita no textarea
        - aperta enter para enviar
        - adicionar a mensagem na listagem

        DEV:
        - [X] Campo criado para digitar o textarea
        - [X] Vamos usar o onChange com o useState (if para caso seja enter a ultima tecla, limpar a variavel)
        - [X] Lista de mensagem

     ./Sua lógica vai aqui */

    const [mensagem, setMensagem] = useState('');
    const [listaMensagens , setListaMensagens] = useState([]);

    const roteamento = useRouter();
    const {username} = roteamento.query;

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // useState para o loading
    const [loading, setLoading] = useState(true)

    
    //Chamaremos somente uma vez
    function escutaMensagensTempoReal(messageToModify){
        return supabaseClient
            .from('mensagens')
            .on('*', (respostaLive) => {
                if(respostaLive.eventType === 'INSERT'){
                    console.log('insert respostaLive: ', respostaLive.new)
                    messageToModify('INSERT', respostaLive.new);
                } else if(respostaLive.eventType === 'DELETE'){
                    console.log('delete respostaLive: ', respostaLive.old)
                    messageToModify('DELETE', respostaLive.old);
                }
            })
            .subscribe();
    }

    // So chama este useEffect na primeira vez que a pagina carrega
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({data}) => {
                console.log('Dados da consulta : ', data);
                setListaMensagens(data); 
                setLoading(false);
            });

        // Quero reusar um valor de referencia (objeto/array)
        // Passar uma funcao para o setState
        escutaMensagensTempoReal((eventType, msg) => {
            if(eventType === 'INSERT'){
                setListaMensagens((valorAtualDaLista) => { 
                    return [msg, ...valorAtualDaLista]
                });
            } else if(eventType === 'DELETE'){
                setListaMensagens((valorAtualDaLista) => { 
                    return (
                        valorAtualDaLista.filter((msgSelected) => {
                            return msgSelected.id != msg.id
                        }))
                });
            }
            
        });
    }, []);

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            // id: listaMensagens.length + 1,
            de: username,
            texto: novaMensagem,            
        };

        supabaseClient
            .from('mensagens')
            .insert([mensagem]) // Tem que ser um objeto com os mesmos campos que voce escreveu no supabase (base de dados)
            .then(({ data }) => {
                // console.log('O que ta vindo de resposta ', data);                
            });      

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://hdwallpaperim.com/wp-content/uploads/2017/09/16/50699-Earth-748x468.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', 
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    opacity: '.9',
                    height: '100%',
                    maxWidth: '80%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header user={username}/>
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                
                {/* ADICIONANDO O LOADING DA MENSAGEM */}
                {loading ? 
                    <Box
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '80%',
                            marginBottom: '4rem',
                        }}
                    >
                        <Image 
                            styleSheet={{
                              opacity: '.5',                              
                            }}
                            src={'https://cliply.co/wp-content/uploads/2021/02/392102850_EARTH_EMOJI_400px.gif'}
                        />
                    </Box>
                    :
                    <MessageList 
                        mensagens={listaMensagens}
                        setMensagens={setListaMensagens} 
                        user={username} 
                        supabaseClient={supabaseClient} 
                    />
                } 
                    

                    {/* {listaMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}> 
                                {mensagemAtual.de}: {mensagemAtual.texto} 
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNovaMensagem(mensagem);
                        }}

                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value; 
                                setMensagem(valor);                                
                            }}
                            // Caso queira incluir nova mensagem apertando o ENTER
                            onKeyPress={(event) => {
                                if(event.key === 'Enter'){
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}  
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '1rem',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Box
                            styleSheet={{
                                width: {xs: '550px', lg: '992'},
                                display: 'flex',
                                flexDirection: {xs: 'column', lg: 'row'},                       
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: '15%',
                            }}
                        >
                            <Button
                                type='submit'
                                iconName='FaAngleDoubleRight'                            
                                buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals[200], //COR DA FONTE
                                mainColor: appConfig.theme.colors.neutrals[800],
                                mainColorStrong: appConfig.theme.colors.neutrals['700'],
                                }}
                                styleSheet={{
                                borderRadius: '50%',
                                padding: '0 3px 0 0',
                                minWidth: '50px',
                                minHeight: '50px',
                                borderRadius: '35px',
                                backgroundColor: appConfig.theme.colors.neutrals[800]
                                }}
                            />
                            {/* Callback = chamada de retorno, ou seja, quando alguma coisa que vc queria terminou,
                             ele vai executar a funcao que vc passou */}
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco de dados')
                                    handleNovaMensagem(`:sticker: ${sticker}`);
                                }}
                            />
                        </Box>
                    </Box>
                </Box> 
            </Box>  
        </Box>
    )
}

function Header(props) {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box styleSheet={{ display: 'flex' , flexDirection: 'row', width: '20%', alignItems: 'center', justifyContent: 'left'}}>
                    <Image 
                        src={`https://github.com/${props.user}.png`}
                        styleSheet={{
                            width: '30%',
                        }}
                    />
                    <Text 
                        variant='heading5'
                        styleSheet={{
                            marginLeft: '1rem',
                        }}>
                            {props.user}                     
                    </Text>
                </Box>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {        
    function handleDeleteMensagem(id){
        const listaMensagensFiltered = props.mensagens.filter(
            messageFiltered =>  messageFiltered.id !== id
            ); 

        props.supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: id })     
            .then(() => {
                props.setMensagens(listaMensagensFiltered);
            })
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["050"],
                marginBottom: '1rem',
            }}            
        >
            
            {props.mensagens.map((mensagemItem) => {
                    return (                         
                            <Text
                                key={mensagemItem.id}
                                tag="li"
                                styleSheet={{
                                    borderRadius: '5px',
                                    padding: '.75rem',
                                    marginBottom: '12px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                    }
                                }}
                            >
                                <Box 
                                    styleSheet={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                        marginBottom: '.5rem',
                                    }}>
                                        <Box
                                            styleSheet={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center', 
                                            }}
                                        >
                                            <Image
                                                styleSheet={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    display: 'inline-block',
                                                    marginRight: '8px',
                                                }}
                                                src={`https://github.com/${mensagemItem.de}.png`}                                                
                                            />
                                            <Text tag="strong">
                                                {mensagemItem.de}
                                            </Text>
                                            <Text
                                                styleSheet={{
                                                    fontSize: '10px',
                                                    marginLeft: '8px',
                                                    color: appConfig.theme.colors.neutrals['050'],
                                                }}
                                                tag="span"
                                            >
                                                {(new Date().toLocaleDateString())}
                                            </Text>                                        
                                        </Box> 
                                        {(mensagemItem.de === props.user) && <Icon 
                                            onClick={e => {
                                                e.preventDefault();
                                                handleDeleteMensagem(mensagemItem.id);                                                                                                                                                
                                            }}
                                            type='button'
                                            name='FaTrash'
                                            styleSheet={{
                                                color: appConfig.theme.colors.neutrals[200], 
                                            }}                                                                                       
                                        /> }
                                </Box>

                                {
                                    mensagemItem.texto.startsWith(':sticker:')
                                    ? <Image src={mensagemItem.texto.replace(':sticker:', '')}
                                        styleSheet={{
                                            width: '120px',
                                        }} />                                    
                                    : mensagemItem.texto
                                }                                
                                  
                            </Text>                        
                                             
                    );
                })}            
        </Box>
    )
}