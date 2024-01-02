// App.tsx

import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
    ChangeEvent,
    MouseEvent,
    ReactElement,
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';
import StarNotaryArtifact from '../artifacts/contracts/StarNotary.sol/StarNotary.json';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledActionButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;
const StyledLabel = styled.label`
  font-weight: bold;
`;
export function StarNotary(): ReactElement {
    const context = useWeb3React<Provider>();
    const { library, active } = context;

    const [signer, setSigner] = useState<Signer>();
    const [starNotaryContract, setStarNotaryContract] = useState<Contract>();
    const [starNotaryContractAddr, setStarNotaryContractAddr] = useState<string>('');

    useEffect((): void => {
        if (!library) {
            setSigner(undefined);
            return;
        }

        setSigner(library.getSigner());
    }, [library]);

    useEffect((): void => {
        if (!starNotaryContract) {
            return;
        }

        // Implement additional logic if needed for contract interactions
    }, [starNotaryContract]);


    async function handleCreateStar(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function createStar(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const starNameInput = prompt('Enter the star name') || '';
                const tokenIdInput = prompt('Enter id') || '0';

                // Validate inputs
                if (!starNameInput || isNaN(parseInt(tokenIdInput))) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const starName = starNameInput;
                const tokenId = parseInt(tokenIdInput);

                await contractWithSigner?.createStar(starName, tokenId);
                window.alert(`Star created successfully!`);
            } catch (error: any) {
                window.alert(
                    'Error creating star!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }
        createStar(signer);
    }

    async function handlePutStarForSale(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function putStarForSale(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Star') || '0';
                const priceInput = prompt('Enter sale price in Wei') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || isNaN(parseInt(priceInput))) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const price = parseInt(priceInput);

                await contractWithSigner?.putStarUpForSale(tokenId, price);
                window.alert(`Star put for sale successfully!`);
            } catch (error: any) {
                window.alert(
                    'Error putting star for sale!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        putStarForSale(signer);
    }

    async function handleBuyStar(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function buyStar(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Star') || '0';
                const valueInput = prompt('Enter purchase amount in Wei') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || isNaN(parseInt(valueInput))) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const value = parseInt(valueInput);

                await contractWithSigner?.buyStar(tokenId, { value });
                window.alert(`Star purchased successfully!`);
            } catch (error: any) {
                window.alert(
                    'Error purchasing star!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        buyStar(signer);
    }

    async function handleLookUpTokenIdToStarInfo(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function lookUpTokenIdToStarInfo(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Star') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput))) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const starInfo = await contractWithSigner?.lookUptokenIdToStarInfo(tokenId);
                window.alert(`Star Info:\n${starInfo}`);
            } catch (error: any) {
                window.alert(
                    'Error looking up star info!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        lookUpTokenIdToStarInfo(signer);
    }

    async function handleExchangeStars(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function exchangeStars(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const tokenId1Input = prompt('Enter Token ID for Star 1') || '0';
                const tokenId2Input = prompt('Enter Token ID for Star 2') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenId1Input)) || isNaN(parseInt(tokenId2Input))) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const tokenId1 = parseInt(tokenId1Input);
                const tokenId2 = parseInt(tokenId2Input);

                await contractWithSigner?.exchangeStars(tokenId1, tokenId2);
                window.alert(`Stars exchanged successfully!`);
            } catch (error: any) {
                window.alert(
                    'Error exchanging stars!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        exchangeStars(signer);
    }

    async function handleTransferStar(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!signer) {
            window.alert('Signer not available');
            return;
        }

        async function transferStar(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = starNotaryContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Star') || '0';
                const toAddress = prompt('Enter recipient address') || '';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || !toAddress) {
                    window.alert('Invalid input. Please provide valid data.');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);

                await contractWithSigner?.transferStar(toAddress, tokenId);
                window.alert(`Star transferred successfully to ${toAddress}`);
            } catch (error: any) {
                window.alert(
                    'Error transferring star!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        transferStar(signer);
    }
    
    // Function to deploy the StarNotary contract
    async function handleDeployContract(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        // only deploy the StarNotary contract one time, when a signer is defined
        if (starNotaryContract || !signer) {
            return;
        }

        async function deployStarNotaryContract(signer: Signer): Promise<void> {
            const StarNotary = new ethers.ContractFactory(
                StarNotaryArtifact.abi,
                StarNotaryArtifact.bytecode,
                signer
            );

            try {
                const starNotaryContract = await StarNotary.deploy();
                await starNotaryContract.deployed();
                window.alert(`StarNotary deployed to: ${starNotaryContract.address}`);

                setStarNotaryContract(starNotaryContract);
                setStarNotaryContractAddr(starNotaryContract.address);
            } catch (error: any) {
                window.alert(
                    'Error!' + (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        deployStarNotaryContract(signer);
    }


    return (
        <>
            <StyledActionButton
                disabled={!active || starNotaryContract ? true : false}
                style={{
                    cursor: !active || starNotaryContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || starNotaryContract ? 'unset' : 'blue'
                }}
                onClick={handleDeployContract}
            >
                Deploy NotaryStar Contract
            </StyledActionButton>
            <SectionDivider />
            <StyledGreetingDiv>
                <StyledLabel>Contract address</StyledLabel>
                <div>
                    {starNotaryContractAddr ? (
                        starNotaryContractAddr
                    ) : (
                        <em>{`<Contract not yet deployed>`}</em>
                    )}
                </div>
                <div></div>
                <StyledLabel>Current contract:</StyledLabel>
                <div>
                </div>
                <div></div>
            </StyledGreetingDiv>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handleCreateStar}
            >
                Create Star
            </StyledActionButton>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handlePutStarForSale}
            >
                Put Star For Sale
            </StyledActionButton>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handleBuyStar}
            >
                Buy Star
            </StyledActionButton>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handleLookUpTokenIdToStarInfo}
            >
                Look Up Token ID
            </StyledActionButton>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handleExchangeStars}
            >
                Exchange Stars
            </StyledActionButton>
            <StyledActionButton
                disabled={!active}
                style={{
                    cursor: !active ? 'not-allowed' : 'pointer',
                    borderColor: !active ? 'unset' : 'blue'
                }}
                onClick={handleTransferStar}
            >
                Transfer Star
            </StyledActionButton>
        </>
    );

}
