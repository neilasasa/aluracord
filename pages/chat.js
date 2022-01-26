import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
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

    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens , setListaMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            id: listaMensagens.length + 1,
            from: 'neilasasa',
            texto: novaMensagem,            
        };

        setListaMensagens([
            mensagem,
            ...listaMensagens,            
        ]);

        setMensagem('');
    }

    function handleDeleteMensagem(event){
        const messageId = event.target.dataset.id;
        const listaMensagensFiltered = listaMensagens.filter((messageFiltered) => {
            return messageFiltered.id != messageId
        }) 

        setListaMensagens(listaMensagensFiltered);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://3l4jojspj4-flywheel.netdna-ssl.com/wp-content/uploads/iStock-921951792.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
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
                <Header />
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

                    <MessageList mensagens={listaMensagens} mensagemDeleted={handleDeleteMensagem} />

                    {/* {listaMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}> 
                                {mensagemAtual.from}: {mensagemAtual.texto} 
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
                        <Button
                            type='submit'
                            label='Enviar'                            
                            buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals[200], //COR DA FONTE
                            mainColor: appConfig.theme.colors.neutrals[800],
                            mainColorStrong: appConfig.theme.colors.neutrals['700'],
                            }}
                            styleSheet={{
                            padding: '.7rem',
                            height: '4rem',
                            width: '4rem',
                            borderRadius: '35px',
                            backgroundColor: appConfig.theme.colors.neutrals[800]
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
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
    const handleDeleteMensagem = props.handleDeleteMensagem;

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
                                        justifyContent: 'space-between'
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
                                            src={`https://github.com/${mensagemItem.from}.png`}
                                        />
                                        <Text tag="strong">
                                            {mensagemItem.from}
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
                                        <Button 
                                            onClick={handleDeleteMensagem} 
                                            type='button'
                                            iconName='FaTrash'
                                            buttonColors={{
                                                contrastColor: appConfig.theme.colors.neutrals[200], //COR DA FONTE
                                                mainColor: "inherit",
                                                mainColorStrong: appConfig.theme.colors.neutrals[700],
                                            }}
                                            data-id={mensagemItem.id}
                                                                                       
                                        /> 
                                </Box>
                                {mensagemItem.texto}
                                  
                            </Text>                        
                                             
                    );
                })}            
        </Box>
    )
}