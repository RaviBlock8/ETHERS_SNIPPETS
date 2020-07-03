pragma solidity 0.6.0;

contract TestEthers {
    struct Student {
        uint256 rollno;
        string name;
        string class;
    }
    mapping(uint256 => Student) public students;
    event StudentAdded(
        uint256 indexed rollno,
        string indexed name,
        string indexed class
    );

    function addStudent(
        uint256 _rollno,
        string calldata _name,
        string calldata _class
    ) external {
        students[_rollno] = Student(_rollno, _name, _class);
        emit StudentAdded(_rollno, _name, _class);
    }

    function getStudentName(uint256 rollno)
        public
        view
        returns (string memory)
    {
        return students[rollno].name;
    }
}
