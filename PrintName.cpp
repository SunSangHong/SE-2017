#include <stdio.h>

int main()
{
    char name[100] = "Hong SunSang";
    int inp_num;
    
    printf("Input Number (0 or 1) : ");
    scanf(" %d", &inp_num);
    
    if(inp_num == 1)
        printf("%s\n", name);
    
    return 0;
}
