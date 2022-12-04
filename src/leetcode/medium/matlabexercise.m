% =================================================================================
%  HAMMING DISTANCE AND CORRECTABLE EROORS COMPUTATION FOR LINEAR BLOCK CODE
% =================================================================================

clc;
close all;

% ======================== END OF TRANSMITTER ========================

in=input('Input (n,k) block code size: ');
n=in(1);
k=in(2);
r=n-k;

if n + 1 > power(2,r)
    display("Linear block equation not satisfied")
    exit()
end

identityMatrix=eye(k)

% ======================== getting parity rows ===========================
parityMatrix = 0:power(2,n-k) -1;
validRow = [];
for i=2:length(parityMatrix)
    if isIdentityRow(parityMatrix(i)) == 0
        validRow=[validRow;parityMatrix(i)];
    end
end
parityFormed = dec2bin(validRow)-48;
parity=parityFormed(1:k, :)
generator=[identityMatrix parity]

data=0:power(2,k)-1;
data=dec2bin(data)-48;
disp('Valid data words')
disp(data);

% ======================== codewords = messageword * generator matrix ===========================

codewords=[];
for i=1:length(data)
    codewords=[codewords;mod(data(i,:)*generator,2)];
end
disp('Valid codewords ready for transmission')
disp(codewords)


% ======================== minimum Hamming Distance dmin ===========================

weights=[];
[r,c]=size(tcode);
for b=1:r
    weight=0;
    for o=1:length(tcode(b,:))
        if(tcode(b,o) == 1)
            weight=weight+1;
        end
    end
    weights=[weights weight];
end

[w,v]=min(weights);
weights(v)=[];
disp('Minimum Hamming Distance (dmin)');
disp(min(weights));

% ======================== calculating correction capability ===========================

disp('Error correction capability (t <= (dmin-1) /2)');
t=(min(weights)-1)/2;
disp(floor(t));

disp("Display Table" + newline + newline);

disp([data tcode [0;weights']])


function y = isIdentityRow(x)
    row = log(x)/log(2);
    y = abs(round(row) - row) < 1e-15;
end

