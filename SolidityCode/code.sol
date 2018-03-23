pragma solidity ^0.4.0;

contract Registry {
    struct Detail {
        string ownerName;
        string dateOfRegistry;
        uint32 khasraNumber;
    }
    
    mapping(uint64 => Detail) registryList;
    
    function newRegistry(uint64 hash, uint32 khasraNumber, string name, string dateOfRegistry) public {
        registryList[hash].ownerName = name;
        registryList[hash].khasraNumber = khasraNumber;
        registryList[hash].dateOfRegistry = dateOfRegistry;
    }
    
    function getRegistry(uint64 hash) view public returns (string, string, uint32) {
        return (registryList[hash].ownerName, registryList[hash].dateOfRegistry, registryList[hash].khasraNumber);
    }
}