#include <stdio.h>

int main()
{
    char name[100] = "Hong SunSang";
    char info[100] = "Electronic & Communication Engineering";
    int inp_num;
    
    printf("Input Number (0 or 1 or 2) : ");
    scanf(" %d", &inp_num);
    
    if(inp_num == 1)
        printf("%s\n", name);
    else if(inp_num == 2)
	    printf("%s\n", info);
    return 0;
}
