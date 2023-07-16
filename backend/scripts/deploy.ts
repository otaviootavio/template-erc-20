import { artifacts, ethers } from "hardhat";
import fs from "fs";
import path from "path";
import { Contract } from "ethers";

export async function main() {
    const erc20Factory = await ethers.getContractFactory("MyToken");

    const erc20 = await erc20Factory.deploy();

    console.log("ERC20 Token deployed to:", erc20.address);
    erc20.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", BigInt(100*10**19));
    saveFrontendFiles( erc20, "MyToken");

    return { erc20 };
}

function saveFrontendFiles(contract: Contract, name: string) {
	const contractsDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
  
	if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
	}
  const ContractArtifact = artifacts.readArtifactSync(name);
  
	fs.writeFileSync(
    path.join(contractsDir, "contract-config.json"),
    JSON.stringify({ address: contract.address, abi: ContractArtifact.abi }, undefined, 2)
	);
}

main()
    .then(() => {
        console.log("Everything is up and running!");
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
