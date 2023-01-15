// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    uint public userCount = 0;
    mapping(string => User) public usersList;

    struct User {
        string username;
        string email;
        string password;
    }

    // Events
    event UserCreated(
        string username,
        string email,
        string password
    );

    function createUser(string memory _username,
                        string memory _email,
                        string memory _password) public {	
        userCount++;
        usersList[_email] = User(_username,
                                _email,
                                _password);
        emit UserCreated(_username,
                        _email,
                        _password);
    }
}
