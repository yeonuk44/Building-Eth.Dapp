# Building-Eth.Dapp

아래 글에서는 “Building Ehereum Dapps(이하 이더리움 디앱 개발) - 한빛미디어(2020) 에 대한 내용을 다룹니다.   
지은이 로베르토 인판테 / 옮긴이 정종화 / 펴낸이 김태헌

# 목차

[1. 책을 배우며](#책을-배우며..)

  [1-1) 알아두면 좋은 것](#알아두면-좋은-것)

  [1-2) 탈중앙화 앱과 분산 앱의 차이점](#탈중앙화-앱과-분산-앱의-차이점)

  [1-3) 블록체인 기술](#블록체인-기술)

[2. 이더리움](#이더리움)

  [2-1) 이더리움 노드 구성](#이더리움-노드-구성)

  [2-2) 이더리움 네트워크](#이더리움-네트워크)

  [2-3) MetaMask](#metamask)

  [2-4) 이더리움 추가 인프라 요소](#이더리움-추가-인프라-요소)
  
  [2-5) 이더리움 개발 프레임워크](#이더리움-개발-프레임워크)
  
  [2-6) JS 테스트 프레임워크](#js-테스트-프레임워크)
  
[3. SimpleCoin Project](#simplecoin-project)

  [3-1) SimpleCoin Improvement(SCI)](#simplecoin-improvement)

  [3-2) 기존 SimpleCoin 과 ERC20 사양과의 차이점(About SCI-4)](#기존-simplecoin-과-erc20-사양과의-차이점)
  
  [3-3) 테스트 계획](#테스트-계획)
  
  [3-4) 테스트 목적](#테스트-목적)
  
[4. SimpleVoting Project](#simplevoting-project)

  [4-1) SimpleVoting Improvement(SVI) ](#simplevoting-improve)

  [4-2) 투표 디앱 요구 사항 정의](#투표-디앱-요구-사항-정의)
  
  [4-3) 투표 절차에 따른 WorkFlow](#투표-절차에-따른-workflow)
  
  [4-4) SimpleVoting 단위 테스트 항목](#SimpleVoting-단위-테스트-항목)

# 책을 배우며..

## 알아두면 좋은 것
- Dapp(탈중앙화 앱)은 특정 주체가 소유 혹은 제어하지 않고 신뢰할 필요가 없는 분산 P2P 네트워크에서 실행되는 새로운 유형의 앱입니다.
- Dapp은 블록체인 기술을 기반으로 공개키 암호화, 해시 함수, 합의 알고리즘을 통한 채굴 기술 등을 활용합니다.
- Dapp은 외부 참여자와 정보를 공유할 수 없는 사내용 앱을 탈중앙화하는 목적에 부합하지 않습니다.
- ICO(Initial Coin Offering)는 토큰 또는 코인 크라우드세일을 뜻하며, 자금 지원이 목적으로 통화적 가치를 지닌 토큰으로 스타트업에 대한 지분을 받게 됩니다. 토큰의 가치는 주최자가 판매를 시작하기 전에 미리 정하거나 판매 기간 동안 토큰 공급량이나 실제 수요와 같은 시장 요인에 따라 가치를 결정할 수 있습니다. 즉, 자금 조달 단계에서 크라우드 세일 참여자가 제공하는 자금을 관리하여 받은 암호화폐를 토큰으로 변화해 각 투자자에게 할당하는 것입니다. 
- ERC20은 표준 이더리움 토큰 컨트랙트입니다.

## 탈중앙화 앱과 분산 앱의 차이점

분산 앱은 하나의 네트워크 내에 여러 서버에서 앱이 실행됩니다. 분산 앱의 경우 일반적으로 하나의 웹 앱은 웹 서버, DB 서버로 구성되고 경우에 따라 전자메일 서버 혹은 기존 메인 프레임으로 구성되어 있습니다. 여러 대의 서버에 기능을 분배하여 분산화되어 있지만 모든 서버는 동일한 기관이 소유하기 떄문에 중앙화되어 있습니다. 그러나 탈중앙화 앱의 경우 이론적으로 각자 다른 주체가 소유하고 있는 노드(서버) 에서 복제되어 실행됩니다. 즉, 노드를 소유하는 주체가 많을수록 전체 네트워크의 신뢰도는 올라갑니다. 따라서 운영하는 앱이 하나의 기관에 의해 운영이 된다면 중앙화된 분산앱일 것이고, 서로 다른 주체가 같은 노드를 소유하고 있다면 탈중앙화 되어 있다 할 수 있습니다.

## 블록체인 기술

작성자외 다수의 직장인 스터디 그룹에서 포스팅한 글을 참고하시면 이해하는게 더 도움이 됩니다.[링크](https://medium.com/programming-bitcoin "programming-bitcoin")

- 공개키 암호화(Public Key Cryptography) : 한 쌍의 키를 기반으로 하는 암호화 기법
- 암호화 해시 함수 : 임의 크기의 데이터를 고정 크기의 데이터로 매핑(mapping)할 수 있는 함수입니다. 매핑된 고정 크기의 데이터는 해시라 부릅니다.
- 블록체인 : 블록체인은 트랜잭션을 담고 있는 각각의 분산된 블록이 체인되어 있는 DB 입니다.
- 채굴 : 트랜잭션을 포함한 블록의 유효성을 증명해주는 행위입니다. 행위에 따른 보상을 받습니다.
- 합의 : 네트워크 참여자들의 트랜잭션 처리 결과를 동의하는 과정을 말합니다. 
- 머클 루트와 머클 트리(Murkle Root , Merkle Tree) : 블록 속 채굴자의 행위에 의해 트랜잭션 머클 트리와 머클 루트가 생성됩니다. 머클 루트를 통해 블록에 포함된 모든 트랜잭션이 하나의 해시로 요약되어 무결성을 보장받습니다. 또한 클라이언트가 네트워크 피어에서 전체 트랜잭션이 아닌 블록 속 머틀루트를 검색하여 블록체인을 더 빠르게 동기화(Light Synchronization)할 수도 있습니다. 트랜잭션 머클 트리가 하나의 해시인 머클 루트가 되는 과정은 가장 낮은 단위인 트랜잭션을 쌍으로(2개) 묶어 해싱하여 해시 값을 얻은 뒤(T1 + T2 = H1) 같은 행위를 반복해 얻은 또 다른 해시 값(T3+ T4 = H2) 를 또 해싱(H1 + H2 = M1) 하여 마지막 하나의 해시 값이 남도록 행위를 반복합니다. 이렇게 마지막 남은 해시 값이 머클 루트가 됩니다.

- - -

# 이더리움

## 이더리움 노드 구성

- 이더리움 클라이언트(Ethereum Client) : 런타임 시 작동하며 네 가지 요소를 포함합니다.
  - 이더리움 가상머신(Ethereum Virtual Machine 이하 EVM) : 솔리디티나 EVM 바이트코드로 작성된 스마트 컨트랙트를 실행하는 머신.
  - 메모리 풀 : 수신한 트랜잭션을 네트워크에 전파하기 전에 저장하는 장소.
  - JSON-RPC API : 다른 노드 혹은 외부 사용자가 클라이언트에 접근할 수 있는 인터페이스.
  - 클라이언트 프로세스 : 수신된 트랜잭션을 적절하게 EVM 에게 송신하거나 메모리 풀에 저장, 검색합니다. 또한 피어(peer)노드에서 받은 블록을 처리한 뒤 블록체인 DB 복사본에 추가합니다.

- 블록체인 데이터베이스(Blockchain Database) : 네트워크상에 배포된 모든 스마트 컨트랙트의 EVM 바이트코드 복사본과 상태를 저장합니다.

## 이더리움 네트워크

1. 솔리디티와 같은 고수준의 언어로 스마트 컨트랙트 작성.
2. 솔리디티 컨트랙트 코드를 EVM  바이트코드로 컴파일.
3. 로컬 전체 노드에서 컨트랙트 EVM 바이트코드를 포함하는 배포 트랜잭션 실행.
4. 로컬 전체 노드에서 배포 트랜잭션을 피어 전체 노드로 전파.
5. 배포 트랜잭션이 채굴 노드에 도달할 때까지 지속적인 전파.
6. 채굴 노드에서 배포 트랜잭션을 새 블록의 내용으로 포함.
7. 새 블록을 블록체인에 추가한 다음 새 블록을 다른 노드로 전파.
8. 컨트랙트 EVM 바이트코드를 포함하는 새로운 블록은 이더리움 네트워크로 전파.

## MetaMask 

메타 마스크는 디앱 MVP 생산할 때 가장 많이 사용하는 확장 프로그램으로 외부 이더리움 노드에 연결하는 크롬 확장 프로그램입니다. 이더리움 소프트웨어(Geth) 를 설치하거나 관리하지 않고도 퍼블릭 네트워크에 컨트랙트를 배포하고 활용할 수 있습니다. 즉, 스마트 컨트랙트를 지속적으로 개발하지 않거나 개발을 재개할 때마다 지갑 또는 Go Ethereum Client 를 업데이트하고 블록체인을 다시 동기화해야 하는 불편함을 원하지 않을 때 유용합니다.   
일반적으로 이더리움 지갑 또는 Go Ethereum Client console은 로컬 노드를 통해 이더리움에 연결하는 방면 메타마스크는 원격 노드를 통해 이더리움에 연결합니다. 원리는 사용자가 메타마스크 크롬 플러그인을 활용하여 메타마스크가 호스팅하는 원격 전체 노드로 이더리움과 연결하는 방식으로 운영됩니다.

## 이더리움 추가 인프라 요소

- 이더리움 네임 서비스(Ethereum Name Service)(ENS) : “0x2kfsj4j5m2o3456mkm65ff8f7ea865adgfa0430e2”과 같은 이더리움 주소를 Briants.manning.eth 와 같이 사람이 읽을 수 있는 이름으로 사용할 수 있도록 하는 탈중앙화된 스마트 컨트랙트입니다.
  - ENS Design(System 구성요소)
    - 레지스트라(Registrar) : 도메인 소유권을 관리하는 컨트랙트입니다.
    - 리졸버(Resolver) : Ethereum Improvement Propesal(EIP)-137에서 정의한 공통 ABI 인터페이스를 구현하는 스마트 컨트랙트로 도메인 이름을 리소스 식별자로 변환합니다.
    - 레지스트리(Registry) : 도메인(또는 서브 도메인) 이름과 도메인 리졸버 매핑입니다.
- 스웜, IPFS : 탈중앙화 스토리지로 알려 있는 두 개의 네트워크입니다. 이더리움 블록체인 틀랜잭션에서 해시 ID(또는 ENS를 활용한 이름)으로 참조할 수 있습니다. 스웜은 이더리움 기반이며 이더리움이며 이더리움과 호환됩니다. IPFS는 유사한 기능을 제공하는 일반적인 기술과 무관한 프로토콜입니다.
- 오라클 프레임워크 : 오라클라이즈(Oraclize) 와 같은 실제 데이터에 접근할 수 있도록 하는 스마트 컨트랙트 프레임워크입니다. 전체 이더리움 노드에서 인증된 데이터를 보장하고 데이터를 일관성 있게 처리하도록 합니다.
- 위스퍼 : 탈중앙화 메시지 네트워크로 이더리움 스마트 컨트랙트에서 발생할 수 있는 장애에 강하고 프라이버시 보호가 주요 특징인 비동기 P2P 통신입니다. 위스퍼 API를 사용하면 컨트랙트에서 메시지를 보낼 때 추적 가능한 평문에서 추적 불가능한 암호문(다크 메시지)까지 다양한 수준의 보안 및 개인 정보를 보낼 수 있습니다.
- 인퓨라 노드 : ConsenSys(트러플 지원 기업) 가 소유하고 있는 인퓨라에서 호스팅하는 이더리움 노드입니다. 인퓨라는 보안 및 개인 정보 보호 기능을 제공하는 내장 클라이언트를 클라우드 서비스로 제공합니다. 기존 클라우드 제공업체처럼 인퓨라를 사용하면 스타트업이나 개발자가 물리적인 서버를 구매하지 않고도 전문적으로 이더리움 애플리케이션을 구축할 수 있습니다.

## 이더리움 개발 프레임워크

이더리움 개발 프레임워크를 사용하는 이유는 많습니다. 코드 컴파일, 재배포, 테스트 코드 작성 등 개발 주기 간소화를 목적으로 사용하는 경우가 많습니다. 이더리움 플랫폼 출시 이후 다양한 스마트 컨트랙트 프레임 워크가 등장했습니다. 총 네 가지만 소개하도록 하겠습니다.

- 트러플 : 가장 유명한 개발 프레임워크로 솔리디티 컨트랙트의 구축, 테스트, 패키징 및 배포를 단순화하는 데 주로 중점을 둡니다. 가장 큰 장점으로는 마이그레이션입니다. 마이그레이션이란 간단히 컨트랙트를 배포하는 스크립트와 설정을 관리하는 방식입니다. 트러플로 테스트를 작성할 때는 컨트랙트를 컴파일하고 배포하기 위한 초기화 코드를 작성할 필요가 없습니다. 프로미스 문법을 사용해 비동기 프로그래밍 방식으로 테스트를 작성합니다. 또한 테스트 작성 시 async/await를 사용하면 코드 가독성이 높아집니다. 다만 가독성을 높이기 위해 Node.js -v 8.0 이상으로 업그레이드를 해야합니다.
- 포풀루스 : 기능적으로는 트러플과 유사합니다. 특정 폴더 구조로 구성된 스마트 컨트랙트 프로젝트를 수행하여 컴파일 테스트 배포주기를 단순화하도록 설계되었습니다. 가나슈와 같은 인-메모리 블록체인, 프라이빗 내부 네트워크, 퍼블릭 네트워크까지 개발 전체 과정을 원활하게 진행할 수 있도록 설정 관리 기능을 제공합니다. 특징으로는 파이썬에 익숙한 개발자가 파이썬을 활용해 단위 테스트를 진행하거나 배포할 수 있다는 점이 있습니다.
- 디앱(Dapple) : 리눅스 환경 기반으로 Nix 패키지 관리자를 통해 배포 됩니다. 특징으로는 이더리움 스마트 컨트랙트 패키징 스펙에 따른 컨트랙트 패키징과 IPFS 프로토콜을 통해 컨트랙트 코드를 분산하는 것에 중점을 둔 설계로 구성되었다는 점입니다. Ethrun 및 ds-test로 단위 테스트 기능도 제공합니다.
- 임바크 : 플랫폼에 구애받지 않는 디앱 프레임워크로 어떤 유형의 디앱을 개발하든 개발과 배포를 단순화하는 것에 목적을 두었습니다. 임바크는 멀티 컨트랙트 디앱의 관리를 도와주고 코드가 변경되면 컨트랙트를 자동으로 배포하도록 구성할 수 있습니다. IPFS 프로코톨(및 스웜)을 통한 탈중앙화 스토리지와 위스퍼 프로토콜을 통한 탈중화 메시징을 지원합니다.

## JS 테스트 프레임워크

만일 개발 프레임워크를 사용하지 않고 일반적인 JS 테스트 프레임워크(모카, 자스민 등)를 사용한다면 2가지 정도의 장점이 있습니다.

- 비동기식 호출 지원, 지속적인 통합 시스템의 종료 상태값, 시간 초과 처리, 테스트 케이스 메타데이터 생성, 향상된 자동화 테스트를 위한 assert 라이브러리 등 다른 개발  프레임워크는 간소화에 집중하였기 때문에  더 고급 단위 테스트 기능을 지원합니다. 
- 프라이빗 또는 퍼블릭 테스트넷에서 엔드 투 엔드로 상호작용하는 테스트를 자동화할 수 있으며 컨트랙트와 통신과 관련해서 타임아웃, 재시도 등을 테스트할 수 있습니다. 

- - -

# SimpleCoin Project

## SimpleCoin Project 를 진행하며..(20.07.06 / "Remix IDE 를 통한 Deploy" Commit 부터 시작)

처음 하드코딩된 값과 전달 함수를 작성하며 Remix IDE 를 통해 배포까지 테스팅을 했습니다.(Ethereum Wallet, MetaMask 도 사용)     
이후 "SimpleCoin Improvement(index)" 를 통해 코드를 지속적으로 개선시키고 있습니다.

## SimpleCoin Improvement

Commit history 속 SimpleCoin Improvement(속칭 SCI) 의 추가설명을 보시면 문제점에 대해 어떻게 해결하였으며, 무엇을 변경하였는지 확인하실 수 있습니다.[링크](https://github.com/yeonuk44/Building-Eth.Dapp/commits/master "Commit history")

0. 전달 함수 속 유효성 검사 부족 해결
1. 기존 제공하던 기능 부족 해결
2. 매번 선언하는 변수 불편함 해결
3. 컨트랙트 소유권 사유화 해결
4. ERC20 호환 문제 해결 및 표준 권고 사항 반영
5. SimpleCoin의 웹 UI 구축(최초의 DApp 생성)
6. SimpleCoin의 테스트 환경 구축 및 테스팅 코드 작성

### 기존 SimpleCoin 과 ERC20 사양과의 차이점

본 테이블은 SCI-4가 있기까지의 비교사항입니다.

| 기존 SimpleCoin                | ERC20 사양   |
| :---: | :---: |
| 해당 없음                       | totalSupply |
| coinBalance()                 | balanceOf   |
| authorize()                   | approve()   |
| 해당 없음(허용값 상태 변수 직접 사용) | allowance() |
| 해당 없음                       | Approval    |

### 테스트 계획

본 계획은 SCI-6을 하기 위한 대략의 계획입니다.

포지티브 테스트를 통해 성공적으로 로직이 실행되는지 검증합니다. 권한이 있는 사용자가 컨트랙트 함수를 실행합니다. 성공적으로 함수를 실행하기 위해서 함수에 정의된 함수 제어자의 제한 조건에 유효한 값을 입력합니다.
네거티브 테스트를 통해 유효하지 않은 값이 입력되거나 권한이 없는 호출자가 호출한 경우 계획된 예외 처리가 발생하는지 확인합니다.
- 함수 제어자에서 호출자를 제한하는 컨트랙트 함수는 호출자에게 권한이 부여되지 않았을 때 예외를 발생시킵니다.
- 다른 함수 제어자에 정의된 제한 조건을 만족하지 않거나 require 조건에 맞지 않는 값을 컨트랙트 함수가 받는 경우 예외 처리를 발생합니다.
JS 유닛 테스트 프레임워크인 모카를 활용해 SimpleCoin의 단위 테스트를 진행할 예정입니다.

### 테스트 목적

| 함수 | 테스트 | 목적 |
| :---: | :---: | :---: |
| 생성자 | 컨트랙트 소유자는 발신자입니다. | 컨트랙트 소유권 테스트 진행. |
| 생성자 | 컨트랙트 소유자 = 초기 공급량 | 생성자 매개변수에서 올바른 상태 변수를 입력하는지 테스트 |
| Mint | 소유자 계정이 아닌 계정에서 mint를 수행할 수 없습니다. | 권한이 없는 계정이 함수를 호출할 때 예외가 발생하는지 테스트 |
| Transfer | 소유한 것보다 더 많은 토큰을 전송할 수 없습니다. | 유효하지 않은 값을 입력하면 함수 제어자나 require문에서 예외가 발생하는지 테스트 |
| Transfer | 최종적인 전송시 성공 여부 | 유효한 계정에서 유효한 입력값으로 실행하여 성공적으로 전송한 뒤 컨트랙트 상태 변수를 확인하는 테스트 |

# SimpleVoting Project

## SimpleVoting Project 를 진행하며..(20.07.23 / (20.07.06 / "Remix IDE 를 통한 SimpleVoting Deploy" Commit 부터 시작)

간단한 투표 디앱을 구현하는 것이 목적입니다. 이 투표는 중앙화된 투표보다 몇 가지 나은 점이 있습니다. 일 예로는 탈중앙화돤 투표 처리와 저장으로 중앙화된 투표 애플리케이션보다 조작가능성이 훨씬 낮다는 점이 있습니다.
스마트 컨트랙트, 단위 테스트, 웹 UI를 포함한 새로운 디앱을 처음부터 구축할 예정이며,컨트랙트를 구현한 후에 개발 환경에서 컨트랙트를 배포하고 단위 테스트를 하는 일반적인 단계를 거칩니다. 그런 다음 트러플로 컴파일하여 생성된 파일에서 ABI를 가져와 이더리움 디앱 웹 UI를 만들 것입니다.

## SimpleVoting Improvement
Commit history 속 SimpleVoting Improvement(속칭 SVI) 의 추가설명을 보시면 문제점에 대해 어떻게 해결하였으며, 무엇을 변경하였는지 확인하실 수 있습니다.[링크](https://github.com/yeonuk44/Building-Eth.Dapp/commits/master "Commit history")

0. Remix를 통한 sol 작성 및 테스트 배포
1. test.js 를 통한 터미널 쉘에서 가 배포
2. Dapp 구현을 위한 웹 UI 생성

### 투표 디앱 요구 사항 정의
- 작은 조직 내에서 사용하는 투표 디앱을 구현합니다. 조직은 유권자 정보를 가지고 이더리움 주소를 화이트리스트에 등록하고, 제안 기간 동안 새로은 제안을 등록할 수 있습니다. 투표 기간 동안 제출된 제안에 투표가 가능합니다.
- 투표는 비밀 투표가 아니며 모든 유권자는 다른 사람의 투표를 볼 수 있습니다.
- 투표는 다수결로 결정이 됩니다. 더 많은 표를 얻은 제안이 채택됩니다.

### 투표 절차에 따른 WorkFlow
1. 투표 관리자는 유권자의 이더리움 주소를 화이트 리스트에 등록합니다.
2. 제안 등록 세션의 시작 권한을 투표 관리자가 가지며, 등록된 유권자는 등록 세션이 진행되는 동안 제안서를 등록할 수 있습니다.
3. 이후 유권자의 제안서 등록이 끝나면 투표 세션이 진행됩니다.
4. 유권자들은 자신이 좋아하는 제안에 투표를 하며 투표 집계가 시작됩니다.
5. 누구나 선출된 제안의 세부 사항을 항시 확인할 수 있습니다.

### SimpleVoting 단위 테스트 항목
- 관리자만 투표자를 등록할 수 있습니다.
- 같은 투표자를 두 번 등록할 수 없습니다.
- 관리자만 제안 등록 세션을 시작할 수 있습니다.
- 제안 등록 세션을 시작한 후에는 관리자만 종료할 수 있습니다.
- 등록된 투표자는 관리자가 제안서 등록 세션을 시작한 후에 제안서를 제출할 수 있습니다.
- 투표 세션이 시작되기 전에 등록된 투표자가 투표할 수 있습니다.
